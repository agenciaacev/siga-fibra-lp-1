import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pain from './components/Pain'
import Solution from './components/Solution'
import Benefits from './components/Benefits'
import UseCases from './components/UseCases'
import FAQ from './components/FAQ'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'

export const WA_LINK =
  'https://wa.me/558531989550?text=Ol%C3%A1!%20Quero%20contratar%20a%20Siga%20Fibra!'

function App() {
  return (
    <div className="min-h-screen font-DM">
      <Navbar />
      <Hero />
      <Pain />
      <Solution />
      <Benefits />
      <UseCases />
      <FAQ />
      <CTAFinal />
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}

export default App
