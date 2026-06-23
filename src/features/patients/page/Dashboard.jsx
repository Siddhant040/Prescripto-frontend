import AppointmentsPanel from "../../components/patient/AppointmentsPanel";
import DashboardHero from "../../components/patient/DashboardHero";
import OverviewCards from "../../components/patient/OverviewCards";
import PrescriptionsPanel from "../../components/patient/PrescriptionsPanel";
import ProfileSidebar from "../../components/patient/ProfileSidebar";
import {
  healthSummary,
  overviewCards,
  prescriptions,
  recentActivity,
  upcomingAppointments,
} from "../../components/patient/dashboardContent";

const Profile = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <DashboardHero />
        <OverviewCards cards={overviewCards} />

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-8">
            <AppointmentsPanel appointments={upcomingAppointments} />
            <PrescriptionsPanel prescriptions={prescriptions} />
          </div>

          <ProfileSidebar
            healthSummary={healthSummary}
            recentActivity={recentActivity}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
