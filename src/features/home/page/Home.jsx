import CareJourneySection from "../components/CareJourneySection.jsx";
import FeaturedDoctorsSection from "../components/FeaturedDoctorsSection";
import HeroSection from "../components/HeroSection";
import HighlightsSection from "../components/HighlightsSection";
import SpecialtiesSection from "../components/SpecialtiesSection";
import {
  careSteps,
  featuredDoctors,
  highlights,
  metrics,
  specialtyCards,
} from "../components/homeContent.js";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection metrics={metrics} />
      <HighlightsSection highlights={highlights} />
      <FeaturedDoctorsSection doctors={featuredDoctors} />
      <CareJourneySection careSteps={careSteps} />
      <SpecialtiesSection specialtyCards={specialtyCards} />
    </div>
  );
};

export default Home;
