import DoctorHero from "../../components/doctor/DoctorHero";
import DoctorOverviewCards from "../../components/doctor/DoctorOverviewCards";
import DoctorSchedulePanel from "../../components/doctor/DoctorSchedulePanel";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import {
  doctorOverviewCards,
  doctorQuickInfo,
  patientRequests,
  todaySchedule,
} from "../../components/doctor/dashboardContent";

const DoctorDashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <DoctorHero />
        <DoctorOverviewCards cards={doctorOverviewCards} />

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <DoctorSchedulePanel schedule={todaySchedule} />
          <DoctorSidebar
            quickInfo={doctorQuickInfo}
            requests={patientRequests}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
