import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import DashBoardReviews from "../components/DashBoardReviews";

import DoctorHero from "../components/DoctorHero";
import DoctorOverviewCards from "../components/DoctorOverviewCards";
import DoctorSchedulePanel from "../components/DoctorSchedulePanel";
import AvailabilitySettingsCard from "../components/settings/AvailabilitySettingsCard";
import {
  mapDoctorHero,
  mapDoctorOverviewCards,
  
  mapTodaySchedule,
} from "../components/doctorDashboardMapper";
import { useDoctorDashboard } from "../hooks/useDoctorDashboard";
import { useDoctor } from "../hooks/useDoctor";

const DoctorDashboard = () => {
  const { doctor, appointments, reviews, loading, error } = useDoctorDashboard();
  const {
    loggedInDoctor,
    handleGetloggedInDoctor,
    handletoggleAvailability,
    updatingAvailability,
  } = useDoctor();

  useEffect(() => {
    handleGetloggedInDoctor();
  }, []);

  const activeDoctor = loggedInDoctor || doctor;
  const heroContent = mapDoctorHero(activeDoctor, appointments);
  const doctorOverviewCards = mapDoctorOverviewCards(
    activeDoctor,
    appointments,
    reviews
  );
  const todaySchedule = mapTodaySchedule(appointments);

  const isAvailable = activeDoctor?.isAvailable ?? false;

  const handleAvailabilityToggle = async () => {
    await handletoggleAvailability({
      isAvailable: !isAvailable,
    });
    await handleGetloggedInDoctor();
  };

  if (loading && !activeDoctor) {
    return <DoctorDashboardLoading />;
  }

  if (error) {
    return <DoctorDashboardError />;
  }

  return (
    <div className="w-full px-1 py-1">
      <div className="space-y-6">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
          <div className="min-w-0 space-y-6">
            <DoctorHero content={heroContent} />
            <DoctorOverviewCards cards={doctorOverviewCards} />
            <AvailabilitySettingsCard
              isAvailable={isAvailable}
              onToggle={handleAvailabilityToggle}
              loading={updatingAvailability}
            />
          </div>

          <div className="min-w-0 space-y-6">
            <DoctorSchedulePanel schedule={todaySchedule} />
            
          </div>
        </div>

        <DashBoardReviews reviewList={reviews} loading={false} />
      </div>
    </div>
  );
};

const DoctorDashboardLoading = () => (
  <div className="w-full px-1 py-1">
    <div className="space-y-6">
      <div className="h-72 animate-pulse rounded-[2.25rem] bg-emerald-100/50" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-[1.75rem] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
          />
        ))}
      </div>
      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
        <div className="h-[680px] animate-pulse rounded-[20px] bg-white" />
        <div className="space-y-6">
          <div className="h-[420px] animate-pulse rounded-[20px] bg-white" />
          <div className="h-[320px] animate-pulse rounded-[20px] bg-white" />
        </div>
      </div>
    </div>
  </div>
);

const DoctorDashboardError = () => (
  <div className="flex min-h-[420px] items-center justify-center px-4">
    <section className="w-full max-w-xl rounded-[2rem] border border-rose-100 bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        Doctor dashboard data could not load
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Please refresh the page or sign in again to continue.
      </p>
    </section>
  </div>
);

export default DoctorDashboard;
