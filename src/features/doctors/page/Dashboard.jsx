import DoctorHero from "../components/DoctorHero";
import DoctorOverviewCards from "../components/DoctorOverviewCards";
import DoctorSchedulePanel from "../components/DoctorSchedulePanel";
import {
  doctorOverviewCards,

  todaySchedule,
} from "../components/dashboardContent";
import { mapDoctorHero } from "../components/doctorDashboardMapper";
import { useDoctorDashboard } from "../hooks/useDoctorDashboard";

const DoctorDashboard = () => {
  const { doctor, appointments } = useDoctorDashboard();
  const heroContent = mapDoctorHero(doctor, appointments);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <DoctorHero content={heroContent} />
        <DoctorOverviewCards cards={doctorOverviewCards} />

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <DoctorSchedulePanel schedule={todaySchedule} />

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
