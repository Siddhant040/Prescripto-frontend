import { useEffect, useState } from "react";
import { useDoctor } from "./useDoctor";

export const useDoctorDetails = (id) => {
  const {
    handleGetDoctorById,
    handleGetAllDoctors,
    doctors,
    selectedDoctor,
    selectedDoctorLoading,
    handleGetReviewsbyId,
    reviews,
  } = useDoctor();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    handleGetDoctorById(id);
    handleGetAllDoctors();
    handleGetReviewsbyId(id);
  }, [id]);

  const doctor = selectedDoctor;
  const availability = doctor?.availability ?? [];
  const slotList = selectedDay?.slots || [];
  const reviewList = reviews;
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
