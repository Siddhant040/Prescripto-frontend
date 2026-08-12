import { useEffect, useState } from "react";

import CareJourneySection from "../components/CareJourneySection";
import FeaturedDoctorsSection from "../components/FeaturedDoctorsSection";
import HeroSection from "../components/HeroSection";
import HighlightsSection from "../components/HighlightsSection";
import SpecialtiesSection from "../components/SpecialtiesSection";

import {
  careSteps,
  highlights,
  specialtyCards,
} from "../components/homeContent";

import { useDoctor } from "../../doctors/hooks/useDoctor";
import { getStats } from "../../../api/stats.api";

const Home = () => {
  const { handleGetAllDoctors, doctors } = useDoctor();

  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    totalPatients: 0,
    totalSpecializations: 0,
  });

  useEffect(() => {
    handleGetAllDoctors();

    const fetchStats = async () => {
      try {
        const response = await getStats();

        setStats(response.data);
      } catch  {
       ;
      }
    };

    fetchStats();
  }, []);

  const metrics = [
    {
      value: `${stats.totalDoctors}+`,
      label: "Specialists ready to help",
    },
    {
      value: `${stats.totalAppointments}+`,
      label: "Successfully served appointments",
    },
    {
      value: "24/7",
      label: "Appointment access",
    },
  ];

  return (
    <div className="overflow-hidden">
      <HeroSection metrics={metrics} />

      <HighlightsSection highlights={highlights} />

      <FeaturedDoctorsSection doctors={doctors} />

      <CareJourneySection careSteps={careSteps} />

      <SpecialtiesSection
        specialtyCards={specialtyCards}
        totalSpecializations={stats.totalSpecializations}
      />
    </div>
  );
};

export default Home;