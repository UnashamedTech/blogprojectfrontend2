import Header from "../components/Header"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import BlogSection from "../components/blog-section"
import VideoSection from "../components/video-section"
import SupportSection from "../components/support-section"
import Footer from "../components/footer"

export default function Home() {
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

