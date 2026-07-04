import DashboardHeroCard from "../components/DashboardHeroCard";
import DashboardQuickActions from "../components/DashboardQuickActions";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStatCards from "../components/DashboardStatCards";
import RecommendedDoctors from "../components/RecommendedDoctors";
import RecentAppointmentsTable from "../components/RecentAppointmentsTable";
import UpcomingAppointmentCard from "../components/UpcomingAppointmentCard";
import {
  heroContent,
  patientProfile,
  quickActions,
  recentActivity,
  recentAppointments,
  recommendedDoctors,
  sidebarNote,
  stats,
  upcomingAppointment,
} from "../components/patientDashboardData";

const Profile = () => {
  return (
    <div className="w-full px-1 py-1">
      <div className="space-y-6">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
          <div className="min-w-0 space-y-6">
            <DashboardHeroCard content={heroContent} />
            <DashboardQuickActions actions={quickActions} />
            <DashboardStatCards stats={stats} />
            <UpcomingAppointmentCard appointment={upcomingAppointment} />
            <RecentAppointmentsTable appointments={recentAppointments} />
            <RecommendedDoctors doctors={recommendedDoctors} />
          </div>

          <div className="min-w-0">
            <DashboardSidebar
              profile={patientProfile}
              upcomingAppointment={upcomingAppointment}
              activity={recentActivity}
              note={sidebarNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
