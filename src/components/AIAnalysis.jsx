import { useState } from 'react'

function AIAnalysis({ language }) {
  const isAr = language === 'ar'
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [symbols, setSymbols] = useState('2222, 2010, 1180')
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState([])

  const runAnalysis = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbols: symbols.split(',').map(s => s.trim()).filter(Boolean),
          language: isAr ? 'ar' : 'en'
        })
      })
      const data = await res.json()
      setInsights(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="analysis" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-white/70 mb-1">{isAr ? 'الرموز' : 'Symbols'}</label>
              <input value={symbols} onChange={e => setSymbols(e.target.value)} placeholder={isAr ? 'مثال: 2222, 2010' : 'e.g., 2222, 2010'} className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button onClick={runAnalysis} disabled={loading} className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold">
              {loading ? (isAr ? 'جارٍ التحليل...' : 'Analyzing...') : (isAr ? 'تحليل' : 'Analyze')}
            </button>
          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-4">
            {insights.map((i, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold">{i.symbol}</h4>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">{i.signal}</span>
                </div>
                <p className="text-white/80 mt-2">{i.summary}</p>
                <div className="mt-3 text-xs text-white/60">RSI: {i.rsi.toFixed(1)} • SMA14: {i.sma_14.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAnalysis
