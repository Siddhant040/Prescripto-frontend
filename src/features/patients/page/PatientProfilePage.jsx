import { useState } from "react";
import { useAuth } from "../../auth/hooks/checkAuth";
import AccountTimeline from "../components/profile/AccountTimeline";
import EditPersonalInformation from "../components/profile/EditPersonalInformation";
import PersonalInformation from "../components/profile/PersonalInformation";
import ProfileHeroCard from "../components/profile/ProfileHeroCard";

const PatientProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    user,
    updateUserProfile,
    updating,
    uploadAvatar,
    uploadingAvatar,
  } = useAuth();

  return (
    <div className="w-full px-1 pb-1">
      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ProfileHeroCard
          user={user}
          uploadAvatar={uploadAvatar}
          uploadingAvatar={uploadingAvatar}
          label="Patient profile"
        />

        {isEditing ? (
          <EditPersonalInformation
            user={user}
            updateUserProfile={updateUserProfile}
            updating={updating}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <PersonalInformation
            user={user}
            onEdit={() => setIsEditing(true)}
          />
        )}

        <AccountTimeline user={user} />
      </div>
    </div>
  );
};

export default PatientProfilePage;
