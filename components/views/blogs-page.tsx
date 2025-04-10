import Header from "../landing-page/Header"
import HeroSection from "../blogs-page/hero-section"
import BlogsCard from "../blogs-page/blogs-card"
import SupportSection from "../landing-page/support-section"
import Footer from "../landing-page/footer"

export default function BlogsPageView() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute w-full z-20">
          <Header />
        </div>
        <HeroSection />
      </div>
      <BlogsCard />
      <SupportSection />
      <Footer />
    </div>
  )
}

