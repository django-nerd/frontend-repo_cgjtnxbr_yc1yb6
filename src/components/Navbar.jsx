import { useEffect } from 'react'

function Navbar({ language, setLanguage }) {
  const isAr = language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr'
    document.documentElement.lang = isAr ? 'ar' : 'en'
  }, [isAr])

  return (
    <header className="fixed top-0 inset-x-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg" />
          <span className="text-white font-semibold text-lg">{isAr ? 'نبض السوق' : 'Market Pulse'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage('en')} className={`px-3 py-2 rounded-md text-sm font-medium ${!isAr ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'} transition`}>
            EN
          </button>
          <button onClick={() => setLanguage('ar')} className={`px-3 py-2 rounded-md text-sm font-medium ${isAr ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'} transition`}>
            ع
          </button>
          <a href="/test" className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition">{isAr ? 'فحص' : 'Test'}</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
