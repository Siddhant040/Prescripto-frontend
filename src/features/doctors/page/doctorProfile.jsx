import { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  IndianRupee,
  MapPin,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/checkAuth";
import AccountTimeline from "../../patients/components/profile/AccountTimeline";
import EditPersonalInformation from "../../patients/components/profile/EditPersonalInformation";
import PersonalInformation from "../../patients/components/profile/PersonalInformation";
import ProfileHeroCard from "../../patients/components/profile/ProfileHeroCard";
import EditProfessionalInformation from "../components/EditProfessionalInformation";
import{useDoctor} from "../hooks/useDoctor";



function DoctorProfile() {
  
  
  const [editingSection, setEditingSection] = useState(null);
  const {
    user,
    updateUserProfile,
    updating,
    uploadAvatar,
    uploadingAvatar,
  } = useAuth();
  const {handleGetloggedInDoctor,loggedInDoctor,handleUpdateDoctorProfile,updatingProfile} = useDoctor();

  useEffect(() => {
    handleGetloggedInDoctor();

  }, []);
   
  
  const doctor = loggedInDoctor
  if (!doctor) {
  return <div>Loading...</div>;
}
    
  console.log("billu",doctor);
  const doctorUser =
    typeof loggedInDoctor.user === "object" && loggedInDoctor.user !== null
      ? loggedInDoctor.user
      : user;
  


  return (
    <div className="w-full px-1 pb-1">
      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ProfileHeroCard
          user={doctorUser}
          doctor={loggedInDoctor}
          uploadAvatar={uploadAvatar}
          uploadingAvatar={uploadingAvatar}
          label="Doctor profile"
          roleIcon={Stethoscope}
          displayNamePrefix="Dr. "
        />

        {editingSection === "personal" ? (
          <EditPersonalInformation
            user={user}
            updateUserProfile={updateUserProfile}
            updating={updating}
            onCancel={() => setEditingSection(null)}
            onSuccess={() => setEditingSection(null)}
          />
        ) : (
          <PersonalInformation
            user={user}
            onEdit={() => setEditingSection("personal")}
          />
        )}

        {
          editingSection === "professional" ? (
            <EditProfessionalInformation
              doctor={doctor}
              updateUserProfile={handleUpdateDoctorProfile}
              updating={updatingProfile}
              onCancel={() => setEditingSection(null)}
              onSuccess={() => setEditingSection(null)}
            />
          ) : (
            <ProfessionalInformation
              doctor={doctor}
              onEdit={() =>
                setEditingSection("professional")
              }
            />
          )
        }

        <AccountTimeline user={user} createdLabel="Joined" />
      </div>
    </div>
  );
}

const ProfessionalInformation = ({ doctor, onEdit }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] xl:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Professional Information
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Doctor Details
          </h2>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Edit Professional Details
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <InfoCard
          icon={<Stethoscope className="h-5 w-5" />}
          title="Specialization"
          value={doctor.specialization}
        />

        <InfoCard
          icon={<Briefcase className="h-5 w-5" />}
          title="Experience"
          value={`${doctor.experience} Years`}
        />

        <InfoCard
          icon={<IndianRupee className="h-5 w-5" />}
          title="Consultation Fee"
          value={`Rs. ${doctor.consultationFee}`}
        />

        <InfoCard
          icon={<BadgeCheck className="h-5 w-5" />}
          title="Verification"
          value="Verified Doctor"
        />

        <InfoCard
          icon={<GraduationCap className="h-5 w-5" />}
          title="Qualifications"
          value={doctor.qualifications}
        />

        <InfoCard
          icon={<MapPin className="h-5 w-5" />}
          title="Clinic Address"
          value={doctor.clinicAddress}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-emerald-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black">
          About
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {doctor.bio}
        </p>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          {title}
        </p>

        <p className="mt-2 text-base font-semibold text-slate-950">{value}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
