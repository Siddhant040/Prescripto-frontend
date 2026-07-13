import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DoctorDetailsContent from "../components/doctorDetailsContent";
import { useDoctorDetails } from "../hooks/useDoctorDetails";

function PublicDoctorDetails() {
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
    profilePath: `/doctors/${doctor._id}`,
  }));

  return (
    <div className="bg-[linear-gradient(180deg,_#f0faf6_0%,_#f8fbfa_36%,_#ffffff_100%)]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-5 flex h-10 flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          <Link to="/" className="transition hover:text-emerald-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/doctors" className="transition hover:text-emerald-700">
            Doctors
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{doctorDetails.doctor.specialization}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-slate-950">
            {doctorDetails.doctor.user.name}
          </span>
        </nav>

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
      </div>
    </div>
  );
}

export default PublicDoctorDetails;
