import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import AIAnalysis from './components/AIAnalysis'

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={setLanguage} />
      <Hero language={language} onGetStarted={() => {
        const el = document.getElementById('dashboard')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} />

      <main id="dashboard" className="pt-10">
        <Dashboard language={language} />
        <AIAnalysis language={language} />

        <footer className="py-10 text-center text-white/60">
          {language === 'ar' ? '© جميع الحقوق محفوظة' : '© All rights reserved'}
        </footer>
      </main>
    </div>
  )
}

export default App
