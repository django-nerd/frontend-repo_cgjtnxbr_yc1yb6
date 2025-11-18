import { useEffect, useState } from 'react'

function Stat({ label, value, tone = 'emerald' }) {
  return (
    <div className={`p-4 rounded-xl bg-${tone}-500/10 border border-${tone}-500/20`}> 
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-2xl font-semibold text-white mt-1">{value}</p>
    </div>
  )
}

function Dashboard({ language }) {
  const isAr = language === 'ar'
  const [orders, setOrders] = useState([])
  const [strategies, setStrategies] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [o, s] = await Promise.all([
          fetch(`${baseUrl}/api/orders`).then(r => r.json()),
          fetch(`${baseUrl}/api/strategies`).then(r => r.json()),
        ])
        setOrders(o)
        setStrategies(s)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="relative -mt-16 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label={isAr ? 'قيمة المحفظة' : 'Portfolio Value'} value="SAR 250,420" />
          <Stat label={isAr ? 'العائد اليومي' : 'Daily P/L'} value="SAR +1,240" />
          <Stat label={isAr ? 'الأوامر المفتوحة' : 'Open Orders'} value={orders.length} />
          <Stat label={isAr ? 'استراتيجيات نشطة' : 'Active Strategies'} value={strategies.filter(s => s.active).length} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3">{isAr ? 'الأوامر' : 'Orders'}</h3>
            <div className="space-y-2">
              {orders.length === 0 && <p className="text-white/60">{isAr ? 'لا توجد بيانات بعد' : 'No data yet'}</p>}
              {orders.map((o, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/90">{o.symbol} • {o.side} • {o.quantity}@{o.price}</div>
                  <div className="text-xs text-white/60">{o.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3">{isAr ? 'الاستراتيجيات' : 'Strategies'}</h3>
            <div className="space-y-2">
              {strategies.length === 0 && <p className="text-white/60">{isAr ? 'لا توجد بيانات بعد' : 'No data yet'}</p>}
              {strategies.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-white/90">{s.name}</div>
                  <div className="text-xs text-white/60">{s.active ? (isAr ? 'نشط' : 'Active') : (isAr ? 'متوقف' : 'Paused')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
