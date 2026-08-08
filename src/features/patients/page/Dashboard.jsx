import { AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "../../auth/hooks/checkAuth";
import DashboardHeroCard from "../components/DashboardHeroCard";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStatCards from "../components/DashboardStatCards";
import RecentAppointmentsTable from "../components/RecentAppointmentsTable";
import RecommendedDoctors from "../components/RecommendedDoctors";
import UpcomingAppointmentCard from "../components/UpcomingAppointmentCard";
import {
  getDashboardStats,
  getUpcomingAppointment,
  mapAppointment,
  mapHeroContent,
  mapPatientProfile,
  mapRecentActivity,
  mapRecommendedDoctors,
  sidebarNote
} from "../components/patientDashboardMapper";
import { usePatientDashboard } from "../hooks/usePatientDashboard";

const Profile = () => {
  const { user } = useAuth();
  const { appointments, doctors, loading, error } = usePatientDashboard();

  const dashboardData = useMemo(() => {
    const patientProfile = mapPatientProfile(user);
    const statsSummary = getDashboardStats(
      appointments,
      patientProfile.profileCompletion
    );
    const upcomingAppointment = getUpcomingAppointment(appointments);
    

    return {
      heroContent: mapHeroContent(upcomingAppointment, statsSummary),
      patientProfile,
      stats: statsSummary.cards,
      upcomingAppointment,
      recentAppointments: appointments.slice(0, 5).map(mapAppointment),
      recommendedDoctors: mapRecommendedDoctors(doctors),
      recentActivity: mapRecentActivity(appointments),
    };
  }, [appointments, doctors, user]);

  if (loading) {
    return <DashboardLoadingState />;
  }

  if (error) {
    return <DashboardErrorState />;
  }

  return (
    <div className="w-full px-1 py-1">
      <div className="space-y-6">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
          <div className="min-w-0 space-y-6">
            <DashboardHeroCard content={dashboardData.heroContent} />
            {/* <DashboardQuickActions actions={quickActions} /> */}
            <DashboardStatCards stats={dashboardData.stats} />
            <UpcomingAppointmentCard appointment={dashboardData.upcomingAppointment} />
            <RecentAppointmentsTable appointments={dashboardData.recentAppointments} />
            <RecommendedDoctors doctors={dashboardData.recommendedDoctors} />
          </div>

          <div className="min-w-0">
            <DashboardSidebar
              profile={dashboardData.patientProfile}
              upcomingAppointment={dashboardData.upcomingAppointment}
              activity={dashboardData.recentActivity}
              note={sidebarNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLoadingState = () => (
  <div className="w-full px-1 py-1">
    <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.65fr)_340px]">
      <div className="space-y-6">
        <div className="h-64 animate-pulse rounded-[20px] bg-emerald-100/60" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-[20px] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-[20px] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]" />
      </div>
      <div className="hidden space-y-5 2xl:block">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-52 animate-pulse rounded-[20px] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          />
        ))}
      </div>
    </div>
  </div>
);

const DashboardErrorState = () => (
  <div className="w-full px-1 py-1">
    <section className="flex min-h-[420px] items-center justify-center rounded-[20px] border border-rose-100 bg-white p-6 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <AlertCircle className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-slate-950">
          Dashboard data could not load
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
          Please refresh the page or sign in again if your session has expired.
        </p>
      </div>
    </section>
  </div>
);

export default Profile;
