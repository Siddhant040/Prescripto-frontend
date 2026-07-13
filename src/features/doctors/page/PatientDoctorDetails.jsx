import { useParams } from "react-router-dom";
import DoctorDetailsContent from "../components/doctorDetailsContent";
import { useDoctorDetails } from "../hooks/useDoctorDetails";

function PatientDoctorDetails() {
  const { id } = useParams();
  const doctorDetails = useDoctorDetails(id);

  if (doctorDetails.selectedDoctorLoading) {
    return <p>Loading...</p>;
  }

  if (!doctorDetails.doctor) {
    return <p>Doctor not found</p>;
  }

  const similarDoctors = doctorDetails.similarDoctors.map((doctor) => ({
    ...doctor,
    profilePath: `/profile/doctors/${doctor._id}`,
  }));

  return (
    <DoctorDetailsContent
      doctor={doctorDetails.doctor}
      initials={doctorDetails.initials}
      availability={doctorDetails.availability}
      selectedDay={doctorDetails.selectedDay}
      selectedSlot={doctorDetails.selectedSlot}
      setSelectedDay={doctorDetails.setSelectedDay}
      setSelectedSlot={doctorDetails.setSelectedSlot}
      slotList={doctorDetails.slotList}
      reviewList={doctorDetails.reviewList}
      similarDoctors={similarDoctors}
    />
  );
}

export default PatientDoctorDetails;
