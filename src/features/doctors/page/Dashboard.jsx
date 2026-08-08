import DoctorHero from "../components/DoctorHero";
import DoctorOverviewCards from "../components/DoctorOverviewCards";
import DoctorSchedulePanel from "../components/DoctorSchedulePanel";
import DashBoardReviews from "../components/DashBoardReviews";
import AvailabilitySettingsCard from "../components/settings/AvailabilitySettingsCard";
// import {
//   doctorOverviewCards,

  
// } from "../components/dashboardContent";
import { mapDoctorHero } from "../components/doctorDashboardMapper";
import { useDoctorDashboard } from "../hooks/useDoctorDashboard";
import { useReview } from "../../review/hook/useReview";
import { useEffect } from "react";

import { useDoctor } from "../hooks/useDoctor";
import{mapTodaySchedule,mapDoctorOverviewCards} from "../components/doctorDashboardMapper"


const DoctorDashboard = () => {

  const { handleDoctorReviewsById, doctorReviewslist, doctorReviewsLoading } = useReview();
  const { doctor, appointments } = useDoctorDashboard();
  const { handleGetloggedInDoctor, loggedInDoctor, handletoggleAvailability, updatingAvailability } = useDoctor();
  console.log("appointments",appointments);
  const todaySchedule = mapTodaySchedule(appointments);
  const doctorOverviewCards = mapDoctorOverviewCards(doctor, appointments,doctorReviewslist);
 

 

  const id = doctor?._id;
  const heroContent = mapDoctorHero(doctor, appointments);
  const reviewsList = doctorReviewslist;
  console.log("reviewsList",reviewsList);

  useEffect(() => {
    if (!id) return;
    handleDoctorReviewsById(id);
  }, [id]);

  useEffect(() => {
    handleGetloggedInDoctor();
  }, []);

const isAvailable = loggedInDoctor?.isAvailable ?? false;
 const ToggleAvailability = () => {
    handletoggleAvailability();
  };

  if (!doctor) return <div>Loading...</div>;
  if(!appointments) return <div>Loading...</div>;
  
  if (doctorReviewsLoading) return <div>Loading...</div>;


  return (
    <>
      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
        <div className="space-y-6">
          <DoctorHero content={heroContent} />
          <DoctorOverviewCards cards={doctorOverviewCards} />
          <AvailabilitySettingsCard
            isAvailable={isAvailable}
            onToggle={ToggleAvailability}/>
        </div>

        <DoctorSchedulePanel schedule={todaySchedule} />
      </div>

      <div className="mt-6">
        <DashBoardReviews reviewList={reviewsList} />
      </div>
    </>
  );
};

export default DoctorDashboard;
