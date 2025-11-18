import Spline from '@splinetool/react-spline'

function Hero({ language, onGetStarted }) {
  const isAr = language === 'ar'
  return (
    <section className={`relative w-full h-[70vh] overflow-hidden ${isAr ? 'rtl' : ''}`}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* dark gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-start justify-center px-6">
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          {isAr ? 'تداول وصناديق استثمار وخوارزميات للسوق السعودي' : 'Trading, Mutual Funds & Algo Trading for the Saudi Market'}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl">
          {isAr ? 'واجهة تفاعلية، لوحة معلومات مفصلة، وتحليلات شاملة مدعومة بالذكاء الاصطناعي.' : 'Interactive interface, detailed dashboard, and comprehensive AI-powered analysis.'}
        </p>
        <div className="mt-8 flex gap-3">
          <button onClick={onGetStarted} className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-lg shadow-emerald-500/25 transition">
            {isAr ? 'ابدأ الآن' : 'Get Started'}
          </button>
          <a href="#analysis" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur transition">
            {isAr ? 'تحليل بالذكاء الاصطناعي' : 'AI Analysis'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
