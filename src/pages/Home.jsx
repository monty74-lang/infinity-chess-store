import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCourses from "../components/FeaturedCourses";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import TelegramButton from "../components/TelegramButton";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedCourses />
      <WhyChooseUs />
      <FAQ />
      <Footer />
      <TelegramButton />
    </div>
  );
}

export default Home;