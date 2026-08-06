import DoctorHero from "../components/DoctorHero";
import DoctorOverviewCards from "../components/DoctorOverviewCards";
import DoctorSchedulePanel from "../components/DoctorSchedulePanel";
import  DashBoardReviews  from "../components/DashBoardReviews";
import AvailabilitySettingsCard from "../components/settings/AvailabilitySettingsCard";
import {
  doctorOverviewCards,

  todaySchedule,
} from "../components/dashboardContent";
import { mapDoctorHero } from "../components/doctorDashboardMapper";
import { useDoctorDashboard } from "../hooks/useDoctorDashboard";
import {useReview} from "../../review/hook/useReview";
import { useEffect } from "react";


const DoctorDashboard = () => {
  const { handleDoctorReviewsById,doctorReviewslist, doctorReviewsLoading } = useReview();
  const { doctor, appointments } = useDoctorDashboard();
  const id = doctor?._id
  const heroContent = mapDoctorHero(doctor, appointments);
  const reviewsList = doctorReviewslist;
  useEffect(() => {
    if (!id) return;
    handleDoctorReviewsById(id);
  }, [id]);
  if(!doctor) return <div>Loading...</div>;
  if(doctorReviewsLoading) return <div>Loading...</div>;

  return (
   <>
  <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
    <div className="space-y-6">
      <DoctorHero content={heroContent} />
      <DoctorOverviewCards cards={doctorOverviewCards} />
      <AvailabilitySettingsCard />
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
