import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import TournamentActivities from '@/components/sections/TournamentActivities'
import EventSchedule from '@/components/sections/EventSchedule'
import Categories from '@/components/sections/Categories'
import Organizers from '@/components/sections/Organizers'
import Merchandise from '@/components/sections/Merchandise'
import FAQSection from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TournamentActivities />
      <EventSchedule />
      <Categories />
      <Organizers />
      <Merchandise />
      <FAQSection />
      <Contact />
      <Footer />
    </main>
  )
}
