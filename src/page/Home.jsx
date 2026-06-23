import CareJourneySection from "../components/home/CareJourneySection";
import FeaturedDoctorsSection from "../components/home/FeaturedDoctorsSection";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import SpecialtiesSection from "../components/home/SpecialtiesSection";
import {
  careSteps,
  featuredDoctors,
  highlights,
  metrics,
  specialtyCards,
} from "../components/home/homeContent";

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
