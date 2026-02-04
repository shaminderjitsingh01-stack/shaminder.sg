/**
 * Referral Partner System - Google Apps Script Backend
 * Deploy as Web App with "Execute as: Me" and "Who has access: Anyone"
 */

// Configuration
const SPREADSHEET_ID = '1NlcTtRDk7sWyCQI0gzDwCyOzoi_xdYN7EMraa65okvo';
const ADMIN_EMAIL = 'hello@shaminder.sg';

// Sheet names
const PARTNERS_SHEET = 'Partners';
const REFERRALS_SHEET = 'Referrals';

// Get spreadsheet and sheets
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getPartnersSheet() {
  return getSpreadsheet().getSheetByName(PARTNERS_SHEET);
}

function getReferralsSheet() {
  return getSpreadsheet().getSheetByName(REFERRALS_SHEET);
}

// Generate unique ID
function generateUUID() {
  return Utilities.getUuid();
}

// Generate referral code
function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'REF';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Handle GET requests
function doGet(e) {
  const action = e.parameter.action;
  const callback = e.parameter.callback;

  let result;

  switch (action) {
    case 'dashboard':
      result = getDashboardData(e.parameter.email);
      break;
    case 'leaderboard':
      result = getLeaderboard();
      break;
    default:
      result = { error: 'Invalid action' };
  }

  if (callback) {
    const output = callback + '(' + JSON.stringify(result) + ')';
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;

    switch (data.action) {
      case 'apply':
        result = applyPartner(data);
        break;
      case 'login':
        result = loginPartner(data);
        break;
      case 'submitReferral':
        result = submitReferral(data);
        break;
      default:
        result = { success: false, error: 'Invalid action' };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Apply as a new partner
function applyPartner(data) {
  try {
    const sheet = getPartnersSheet();
    const existingPartners = getPartnersData();

    // Check if email already exists
    const existing = existingPartners.find(p => p.email === data.email);
    if (existing) {
      return { success: false, error: 'Email already registered' };
    }

    // Generate unique referral code
    let referralCode;
    do {
      referralCode = generateReferralCode();
    } while (existingPartners.find(p => p.referralCode === referralCode));

    // Create new partner record
    const newPartner = [
      generateUUID(),
      data.name,
      data.email,
      data.password,
      data.phone,
      data.company || '',
      referralCode,
      'pending',
      30,
      0,
      0,
      0,
      new Date().toISOString(),
      ''
    ];

    sheet.appendRow(newPartner);

    // Send notification email to admin
    try {
      sendAdminNotification(data);
    } catch (e) {
      // Email might fail, but application should still succeed
    }

    return { success: true, message: 'Application submitted successfully' };
  } catch (error) {
    return { success: false, error: 'Failed to submit application: ' + error.toString() };
  }
}

// Login partner
function loginPartner(data) {
  try {
    const partners = getPartnersData();
    const partner = partners.find(p => p.email === data.email && p.password === data.passwordHash);

    if (!partner) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (partner.status === 'pending') {
      return { success: false, error: 'Your application is still pending approval' };
    }

    if (partner.status === 'suspended') {
      return { success: false, error: 'Your account has been suspended' };
    }

    return {
      success: true,
      partner: {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        referralCode: partner.referralCode
      }
    };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}

// Get dashboard data
function getDashboardData(email) {
  try {
    const partners = getPartnersData();
    const partner = partners.find(p => p.email === email);

    if (!partner) {
      return { success: false, error: 'Partner not found' };
    }

    const allReferrals = getReferralsData();
    const partnerReferrals = allReferrals.filter(r => r.referralCode === partner.referralCode);

    const leaderboard = partners
      .filter(p => p.status === 'approved')
      .map(p => ({
        name: p.name,
        email: p.email,
        totalReferrals: parseInt(p.totalReferrals) || 0,
        totalEarnings: parseFloat(p.totalEarnings) || 0
      }))
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, 5);

    return {
      success: true,
      partner: {
        totalReferrals: parseInt(partner.totalReferrals) || 0,
        totalEarnings: parseFloat(partner.totalEarnings) || 0,
        pendingPayout: parseFloat(partner.pendingPayout) || 0
      },
      referrals: partnerReferrals.slice(0, 10),
      leaderboard: leaderboard
    };
  } catch (error) {
    return { success: false, error: 'Failed to load dashboard' };
  }
}

// Submit a referral
function submitReferral(data) {
  try {
    const sheet = getReferralsSheet();
    const partnersSheet = getPartnersSheet();
    const partners = getPartnersData();

    const partner = partners.find(p => p.referralCode === data.referralCode);
    if (!partner) {
      return { success: false, error: 'Invalid referral code' };
    }

    const newReferral = [
      generateUUID(),
      partner.id,
      data.referralCode,
      data.leadName,
      data.leadEmail,
      data.leadPhone || '',
      data.service || '',
      'pending',
      0,
      new Date().toISOString(),
      ''
    ];

    sheet.appendRow(newReferral);

    const partnerRow = getPartnerRowByEmail(partner.email);
    if (partnerRow) {
      const currentReferrals = parseInt(partnersSheet.getRange(partnerRow, 10).getValue()) || 0;
      partnersSheet.getRange(partnerRow, 10).setValue(currentReferrals + 1);
    }

    return { success: true, message: 'Referral submitted successfully' };
  } catch (error) {
    return { success: false, error: 'Failed to submit referral' };
  }
}

// Get leaderboard
function getLeaderboard() {
  try {
    const partners = getPartnersData();

    const leaderboard = partners
      .filter(p => p.status === 'approved')
      .map(p => ({
        name: p.name,
        totalReferrals: parseInt(p.totalReferrals) || 0,
        totalEarnings: parseFloat(p.totalEarnings) || 0
      }))
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, 10);

    return { success: true, leaderboard };
  } catch (error) {
    return { success: false, error: 'Failed to load leaderboard' };
  }
}

// Helper: Get all partners data
function getPartnersData() {
  const sheet = getPartnersSheet();
  const data = sheet.getDataRange().getValues();

  return data.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    email: row[2],
    password: row[3],
    phone: row[4],
    company: row[5],
    referralCode: row[6],
    status: row[7],
    commissionRate: row[8],
    totalReferrals: row[9],
    totalEarnings: row[10],
    pendingPayout: row[11],
    createdAt: row[12],
    approvedAt: row[13]
  }));
}

// Helper: Get all referrals data
function getReferralsData() {
  const sheet = getReferralsSheet();
  const data = sheet.getDataRange().getValues();

  return data.slice(1).map(row => ({
    id: row[0],
    partnerId: row[1],
    referralCode: row[2],
    leadName: row[3],
    leadEmail: row[4],
    leadPhone: row[5],
    service: row[6],
    status: row[7],
    commissionAmount: row[8],
    createdAt: row[9],
    convertedAt: row[10]
  }));
}

// Helper: Get partner row number by email
function getPartnerRowByEmail(email) {
  const sheet = getPartnersSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][2] === email) {
      return i + 1;
    }
  }
  return null;
}

// Send admin notification
function sendAdminNotification(data) {
  const subject = '[Shaminder.sg] New Partner Application';
  const body = `
New partner application received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Promotion Method: ${data.promotion}
Notes: ${data.notes || 'N/A'}

Login to Google Sheets to approve or reject this application.
  `;

  MailApp.sendEmail(ADMIN_EMAIL, subject, body);
}

// Admin: Approve partner
function approvePartner(email) {
  const sheet = getPartnersSheet();
  const row = getPartnerRowByEmail(email);

  if (row) {
    sheet.getRange(row, 8).setValue('approved');
    sheet.getRange(row, 14).setValue(new Date().toISOString());

    const partnerEmail = sheet.getRange(row, 3).getValue();
    const partnerName = sheet.getRange(row, 2).getValue();
    const referralCode = sheet.getRange(row, 7).getValue();

    sendApprovalEmail(partnerEmail, partnerName, referralCode);
    return true;
  }
  return false;
}

// Send approval email
function sendApprovalEmail(email, name, referralCode) {
  const subject = 'Welcome to the Shaminder.sg Partner Program!';
  const body = `
Hi ${name},

Great news! Your application to the Shaminder.sg Partner Program has been approved.

Login to your dashboard: https://shaminder.sg/referrals/login.html

How to Refer:
Email hello@shaminder.sg with your name and the referral's details.

Commission: 30% on all successful referrals
Payouts: Monthly via PayNow or bank transfer

Questions? WhatsApp us at +65 9813 7066.

Welcome aboard!
Shaminder Singh
  `;

  MailApp.sendEmail(email, subject, body);
}

// Initialize sheets (run once)
function initializeSheets() {
  const ss = getSpreadsheet();

  let partnersSheet = ss.getSheetByName(PARTNERS_SHEET);
  if (!partnersSheet) {
    partnersSheet = ss.insertSheet(PARTNERS_SHEET);
  }
  partnersSheet.getRange(1, 1, 1, 14).setValues([[
    'ID', 'Name', 'Email', 'PasswordHash', 'Phone', 'Company',
    'ReferralCode', 'Status', 'CommissionRate', 'TotalReferrals',
    'TotalEarnings', 'PendingPayout', 'CreatedAt', 'ApprovedAt'
  ]]);

  let referralsSheet = ss.getSheetByName(REFERRALS_SHEET);
  if (!referralsSheet) {
    referralsSheet = ss.insertSheet(REFERRALS_SHEET);
  }
  referralsSheet.getRange(1, 1, 1, 11).setValues([[
    'ID', 'PartnerID', 'ReferralCode', 'LeadName', 'LeadEmail',
    'LeadPhone', 'Service', 'Status', 'CommissionAmount',
    'CreatedAt', 'ConvertedAt'
  ]]);

  Logger.log('Sheets initialized successfully');
}

// Test functions
function testApply() {
  const result = applyPartner({
    name: 'Test User',
    email: 'testuser@test.com',
    password: 'hash123',
    phone: '+65 9999 9999',
    company: 'Test Co',
    promotion: 'social_media',
    notes: 'Testing'
  });
  Logger.log('Result: ' + JSON.stringify(result));
}

function clearAllPartners() {
  const sheet = getPartnersSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  Logger.log('All partners deleted');
}
