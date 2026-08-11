import { useEffect, useState } from "react";
import { useDoctor } from "./useDoctor";
import { useReview } from "../../review/hook/useReview";

export const useDoctorDetails = (id) => {
  
  const {
    handleGetDoctorById,
    handleGetAllDoctors,
 
    doctors,
    selectedDoctor,
    selectedDoctorLoading,
    
    
  
  } = useDoctor();
  const{handleDoctorReviewsById,
        doctorReviewslist,
        doctorReviewsLoading} = useReview();
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    handleGetDoctorById(id);
    handleGetAllDoctors();
    handleDoctorReviewsById(id);
   
  }, [id]);
  

  const doctor = selectedDoctor;
  const availability = doctor?.availability ?? [];
  const slotList = selectedDay?.slots || [];
  const reviewList = doctorReviewslist || [];

  const similarDoctors = doctor
    ? doctors
        .filter(
          (item) =>
            item._id !== doctor._id &&
            item.specialization === doctor.specialization
        )
        .slice(0, 3)
    : [];
  const initials =
    doctor?.user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("") ?? "";
      
     

  return {
    doctor,
    initials,
    availability,
    selectedDay,
    selectedSlot,
    setSelectedDay,
    setSelectedSlot,
    slotList,
    reviewList,
    similarDoctors,
    selectedDoctorLoading,
  };
};
