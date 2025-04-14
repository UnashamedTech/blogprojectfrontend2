import Header from "../landing-page/Header"
import HeroSection from "../landing-page/hero-section"
import AboutSection from "../landing-page/about-section"
import BlogSection from "../landing-page/blog-section"
import VideoSection from "../landing-page/video-section"
import SupportSection from "../landing-page/support-section"
import Footer from "../landing-page/footer"

export default function LandingPageView() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute w-full z-20">
          <Header />
        </div>
        <HeroSection />
      </div>
      <AboutSection />
      <BlogSection />
      <VideoSection />
      <SupportSection />
      <Footer />
    </div>
  )
}

