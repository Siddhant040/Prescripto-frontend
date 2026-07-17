import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DoctorAppointmentActions from "../components/doctor/DoctorAppointmentActions";
import DoctorAppointmentInfoCard from "../components/doctor/DoctorAppointmentInfoCard";
import DoctorPatientInfoCard from "../components/doctor/DoctorPatientInfoCard";
import PrescriptionPanel from "../components/doctor/PrescriptionPanel";

import { useAppointments } from "../hooks/useAppointment";
import { useEffect } from "react";

function DoctorAppointmentDetailPage() {

  const { id } = useParams();
  const { handleGetAppointmentbyId,selectedAppointment,appointmentLoading,handleUpdateAppointmentStatus,handleCancelAppointment,canceling,updating } = useAppointments();
  const appointment = selectedAppointment
  const status = appointment?.status
  useEffect(()=>{
    handleGetAppointmentbyId(id);
  },[id])
  if(!appointment){
    return <div>Loading</div>
  }
  if(appointmentLoading){
    return <div>Loading</div>
  }
  console.log("appoitnment",appointment)

  const onUpdateStatus = async (id,status) => {
    try{
      await handleUpdateAppointmentStatus(id,status);
      handleGetAppointmentbyId(id);

    }catch(error){
      console.log(error);
      toast.error("Unable to update status");
    }
  }
    const cancelAppointment = async (id) => {
    try{
      await handleCancelAppointment(id);
      handleGetAppointmentbyId(id);
    }catch(error){
      console.log(error);
      toast.error("Unable to cancel appointments");
    }
  }



   

  return (
    <div className="w-full px-1 pb-1">
      <Link
        to="/doctor-dashboard/appointments"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </Link>

      <div className="mb-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Appointment details
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
          Review patient appointment information.
        </h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-4">
          <DoctorPatientInfoCard appointment={appointment} />
          <DoctorAppointmentInfoCard appointment={appointment} />
        </div>

        <div className="space-y-4">
          <PrescriptionPanel id={id} />
          <DoctorAppointmentActions
            status={status}
            id={id}
            onUpdateStatus={onUpdateStatus}
            onCancel={cancelAppointment} />
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointmentDetailPage;
