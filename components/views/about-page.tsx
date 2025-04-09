import Header from "../landing-page/Header"
import HeroSection from "../about-page/hero-section"
import StorySection from "../about-page/story-section"
import MetChrist from "../about-page/met-christ"
import Wife from "../about-page/wife"
import CurrentMission from "../about-page/current-mission"
import {TestimonialsCarousel} from "../about-page/testimonials-carousel"
import SupportSection from "../landing-page/support-section"
import Footer from "../landing-page/footer"

export default function AboutPageView() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute w-full z-20">
          <Header />
        </div>
        <HeroSection />
      </div>
      <StorySection />
      <MetChrist />
      <Wife />
      <CurrentMission />
      <TestimonialsCarousel />
      <SupportSection />
      <Footer />
    </div>
  )
}

