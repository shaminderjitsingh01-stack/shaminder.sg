'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

const GST_RATE = 0.09

export default function GSTCalculator() {
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'add' | 'remove'>('add')

  const numAmount = parseFloat(amount) || 0
  const gstAmount = mode === 'add' ? numAmount * GST_RATE : numAmount - numAmount / (1 + GST_RATE)
  const totalAmount = mode === 'add' ? numAmount + gstAmount : numAmount - gstAmount
  const beforeGst = mode === 'remove' ? numAmount / (1 + GST_RATE) : numAmount

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'GST Calculator' }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Singapore GST Calculator</h1>
          <p className="text-gray-600 mb-8">Calculate 9% GST instantly. Add or remove GST from any amount.</p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setMode('add')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${mode === 'add' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Add GST
              </button>
              <button
                onClick={() => setMode('remove')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${mode === 'remove' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Remove GST
              </button>
            </div>

            {/* Input */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'add' ? 'Amount (before GST)' : 'Amount (including GST)'}
            </label>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                step="0.01"
              />
            </div>

            {/* Results */}
            {numAmount > 0 && (
              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount before GST</span>
                  <span className="font-semibold text-gray-900">${beforeGst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST (9%)</span>
                  <span className="font-semibold text-indigo-600">${gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                  <span className="text-gray-900 font-bold">
                    {mode === 'add' ? 'Total (with GST)' : 'Amount before GST'}
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${mode === 'add' ? totalAmount.toFixed(2) : beforeGst.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-3">About Singapore GST</h2>
            <p className="text-sm text-gray-600 mb-2">Singapore&apos;s Goods and Services Tax (GST) is currently <strong>9%</strong> (effective 1 January 2024).</p>
            <p className="text-sm text-gray-600">Businesses with annual taxable turnover exceeding S$1 million must register for GST with IRAS.</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
