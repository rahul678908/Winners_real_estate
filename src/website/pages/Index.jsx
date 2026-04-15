import Navbar from "../components/Navbar";
import Properties from "../components/Properties";
import FeaturedProperties from "../components/FeaturedProperties";
import CTASection from "../components/CTASection";
import Categories from "../components/Categories";
import SellingSection from "../components/SellingSection";
import Testimonials from "../components/Testimonials";
import EnquiryForm from "../components/EnquiryForm";

function Home() {
  return (
    <>
      <Navbar />
      <Properties />
      <FeaturedProperties />
      <CTASection />
      <Categories />
      <SellingSection />
      <Testimonials />
      <EnquiryForm />
    </>
  );
}

export default Home;