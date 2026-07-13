import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/checkAuth";
import AvailabilitySettingsCard from "../components/settings/AvailabilitySettingsCard";
import DeleteDoctorProfileCard from "../components/settings/DeleteDoctorProfileCard";
import DoctorAccountInformation from "../components/settings/DoctorAccountInformation";
import DoctorPasswordCard from "../components/settings/DoctorPasswordCard";
import UpdateAvailabilityCard from "../components/settings/UpdateAvailabilityCard";
import { useDoctor } from "../hooks/useDoctor";

function DoctorSettingPage() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    handleChangePassword,
    updatingPassword,
    handleChangeActiveRole,
  } = useAuth();
  const { handleGetloggedInDoctor, loggedInDoctor, handletoggleAvailability, updatingAvailability, handleDeleteDoctor, deleting } = useDoctor();

  useEffect(() => {
    handleGetloggedInDoctor();
  }, []);

  useEffect(() => {
    if (typeof loggedInDoctor?.isAvailable === "boolean") {
      setIsAvailable(loggedInDoctor.isAvailable);
    }
  }, [loggedInDoctor]);

  const ToggleAvailability = () => {
    handletoggleAvailability();
  };

  const handleDeleteDoctorProfile = async () => {
    try {
      const response = await handleDeleteDoctor();

      toast.success(response?.message || "Doctor profile deleted successfully");
      await handleChangeActiveRole("patient");
      navigate("/profile", { replace: true });

    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete doctor");

    }
  };

  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Doctor settings
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
          Manage your doctor account, security, and availability.
        </h1>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <DoctorAccountInformation
            user={user}
            doctor={loggedInDoctor}
          />

          <AvailabilitySettingsCard
            isAvailable={isAvailable}
            onToggle={ToggleAvailability}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <DoctorPasswordCard
            onChangePassword={handleChangePassword}
            updatingPassword={updatingPassword}
          />

          <DeleteDoctorProfileCard
            onDelete={handleDeleteDoctorProfile}
            deleting={deleting}
          />
        </div>

        <div className="xl:col-span-2">
          <UpdateAvailabilityCard
           doctor={loggedInDoctor}
           refreshDoctor={handleGetloggedInDoctor}
           />
        </div>
      </div>

    </div>
  );
}

export default DoctorSettingPage;
