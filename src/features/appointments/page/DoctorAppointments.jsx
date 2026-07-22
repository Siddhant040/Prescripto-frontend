import { useMemo, useState } from "react";
import DoctorAppointmentFilters from "../components/doctor/DoctorAppointmentFilters";
import DoctorAppointmentList from "../components/doctor/DoctorAppointmentList";
import DoctorAppointmentStats from "../components/doctor/DoctorAppointmentStats";
import {
  getDoctorAppointmentStats,

} from "../components/doctor/doctorAppointmentUiData";
import { useAppointments } from "../hooks/useAppointment";
import { useEffect } from "react";

function DoctorAppointments() {
  const [page, setPage] = useState(1);
  const {handleDoctorAppointments,doctorAppointments,doctorListLoading,pagination} = useAppointments();
  useEffect(() => {
    handleDoctorAppointments(page,10);
  }, [page]);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  
  
  const appointments = doctorAppointments;
  const stats = getDoctorAppointmentStats(appointments);


  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.patient?.name
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (dateFilter !== "all") {
      const today = new Date();

      filtered = filtered.filter((item) => {
        const appointmentDate = new Date(item.date);

        if (dateFilter === "today") {
          return appointmentDate.toDateString() === today.toDateString();
        }

        if (dateFilter === "week") {
          const weekFromNow = new Date();
          weekFromNow.setDate(today.getDate() + 7);
          return appointmentDate >= today && appointmentDate <= weekFromNow;
        }

        if (dateFilter === "month") {
          return (
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getFullYear() === today.getFullYear()
          );
        }

        return true;
      });
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
    if(doctorListLoading){
    return <div>Loading...</div>
  }

    return filtered;
  }, [appointments, dateFilter, searchTerm, sortBy, statusFilter]);
  

  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Appointments
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
            Manage patient appointments.
          </h1>
        </div>

       
      </div>

      <div className="space-y-4">
        <DoctorAppointmentStats stats={stats} />
        <DoctorAppointmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <DoctorAppointmentList
          appointments={filteredAppointments}
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default DoctorAppointments;
