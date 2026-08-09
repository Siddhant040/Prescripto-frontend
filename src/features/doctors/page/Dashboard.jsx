import DoctorHero from "../components/DoctorHero";
import DoctorOverviewCards from "../components/DoctorOverviewCards";
import DoctorSchedulePanel from "../components/DoctorSchedulePanel";
import DashBoardReviews from "../components/DashBoardReviews";
import AvailabilitySettingsCard from "../components/settings/AvailabilitySettingsCard";

import {
  mapDoctorHero,
  mapTodaySchedule,
  mapDoctorOverviewCards,
} from "../components/doctorDashboardMapper";

import { useDoctorDashboard } from "../hooks/useDoctorDashboard";
import { useReview } from "../../review/hook/useReview";
import { useDoctor } from "../hooks/useDoctor";

import { useEffect } from "react";

const DoctorDashboard = () => {
  const {
    handleDoctorReviewsById,
    doctorReviewslist = [],
    doctorReviewsLoading,
  } = useReview();

  const {
    doctor,
    appointments = [],
  } = useDoctorDashboard();

  const {
    handleGetloggedInDoctor,
    loggedInDoctor,
    handletoggleAvailability,
    updatingAvailability,
  } = useDoctor();

  const id = doctor?._id;

  // -----------------------------
  // Dashboard data
  // -----------------------------

  const todaySchedule = mapTodaySchedule(appointments);

  const doctorOverviewCards = mapDoctorOverviewCards(
    doctor,
    appointments,
    doctorReviewslist
  );

  const heroContent = mapDoctorHero(
    doctor,
    appointments
  );

  // -----------------------------
  // Get doctor reviews
  // -----------------------------

  useEffect(() => {
    if (!id) return;

    handleDoctorReviewsById(id);
  }, [id]);

  // -----------------------------
  // Get logged-in doctor
  // -----------------------------

  useEffect(() => {
    handleGetloggedInDoctor();
  }, []);

  // -----------------------------
  // Availability
  // -----------------------------

  const isAvailable = loggedInDoctor?.isAvailable ?? false;

  const ToggleAvailability = () => {
    handletoggleAvailability();
  };

  // -----------------------------
  // Initial doctor loading
  // -----------------------------

  if (!doctor) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading doctor dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-1 py-1">
      <div className="space-y-6">

        {/* Hero + Overview + Availability + Schedule */}
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">

          {/* Left column */}
          <div className="min-w-0 space-y-6">

            <DoctorHero
              content={heroContent}
            />

            <DoctorOverviewCards
              cards={doctorOverviewCards}
            />

            <AvailabilitySettingsCard
              isAvailable={isAvailable}
              onToggle={ToggleAvailability}
              loading={updatingAvailability}
            />

          </div>

          {/* Right column */}
          <div className="min-w-0">
            <DoctorSchedulePanel
              schedule={todaySchedule}
            />
          </div>

        </div>

        {/* Patient Reviews */}
        <div className="mt-6">
          <DashBoardReviews
            reviewList={doctorReviewslist}
            loading={doctorReviewsLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;