import { CalendarPlus } from "lucide-react";
import AppointmentFilters from "../components/AppointmentFilters";
import AppointmentList from "../components/AppointmentList";
import AppointmentStats from "../components/AppointmentStats";
import { useEffect,useMemo } from "react";
import { useState } from "react";
import { useAppointments } from "../hooks/useAppointment";
import {
  getAppointmentStats,
  sampleAppointments,
} from "../components/appointmentUiData";

function Appointments() {
  const appointments = sampleAppointments;
  const { handlePatientAppointments, Appointments, listLoading } = useAppointments();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    handlePatientAppointments();
  }, []);
 
  console.log("Appointments",Appointments);
  const stats = getAppointmentStats(Appointments);

  const filteredAppointments = useMemo(() => {
    let filtered =[...Appointments] 
    //1.Search
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    //2.Status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.status === statusFilter
      );
    }
    // 3. Date
if (dateFilter !== "all") {
  const today = new Date();

  filtered = filtered.filter((item) => {
    const appointmentDate = new Date(item.date);

    switch (dateFilter) {
      case "today":
        return (
          appointmentDate.toDateString() === today.toDateString()
        );

      case "week": {
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);

        return (
          appointmentDate >= today &&
          appointmentDate <= weekFromNow
        );
      }

      case "month":
        return (
          appointmentDate.getMonth() === today.getMonth() &&
          appointmentDate.getFullYear() === today.getFullYear()
        );

      default:
        return true;
    }
  });
}
// 4. Sort
filtered.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (sortBy === "newest") {
    return dateB - dateA;
  }

  if (sortBy === "oldest") {
    return dateA - dateB;
  }

  return 0;
});
    
    
    return filtered
  }, [Appointments, searchTerm, statusFilter, dateFilter, sortBy]);
   if (listLoading) {
    return <div>Loading...</div>
  }




  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            My appointments
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
            Manage and track all your appointments.
          </h1>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <CalendarPlus className="h-4 w-4" />
          Book Appointment
        </button>
      </div>

      <div className="space-y-4">
        <AppointmentStats stats={stats} />
        <AppointmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <AppointmentList
          appointments={filteredAppointments}
          page={1}
          limit={10}
          total={filteredAppointments.length}
        />
      </div>
    </div>
  );
}

export default Appointments;
