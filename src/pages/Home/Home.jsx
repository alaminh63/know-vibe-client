import HeroSection from "../../Components/HeroSection/HeroSection";
import Try from "../../Components/Try";
import WhyChooseSection from "../../Components/WhyChooseSection/WhyChooseSection";
import Courses from "../Courses/Courses";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="mt-5">

      <Courses/>
      </div>
      <WhyChooseSection/>
      {/* <Try /> */}
    </div>
  );
};

export default Home;
