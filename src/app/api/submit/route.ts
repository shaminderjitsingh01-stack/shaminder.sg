import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, phone, email, business, industry } = await request.json()

    if (!name || !phone || !email || !business || !industry) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Shaminder.sg <hello@shaminder.sg>',
      to: 'hello@shaminder.sg',
      subject: `New Free Video Request — ${business} (${industry})`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Free Video Request</h2>
          <p>Someone wants to be featured on your channel:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666; width: 120px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Business</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${business}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Industry</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${industry}</td></tr>
          </table>
          <p style="color: #666; font-size: 14px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
