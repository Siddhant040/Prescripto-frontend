import { 
    patientAppointments,
     getAppointmentbyId,
      cancelAppointment,
       getAvailableSlots,
        createAppointment,
         rescheduleAppointment,
        getDoctorAppointments,
        updateAppointmentStatus,
         createPrescription } from "../../../api/appointment.api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAppointments = () => {
    const [Appointments, setAppointments] = useState([]);
    
  const [listLoading, setListLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [slot , setSlot] = useState(null);
  const [slotLoading, setSlotLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [doctorListLoading, setDoctorListLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creatingPrescription, setCreatingPrescription] = useState(false);
    


    const handlePatientAppointments = async () => {
        try {
            setListLoading(true);
            const response = await patientAppointments();
            setAppointments(response.data?.appointments ?? []);
            return response.data?.appointments ?? [];
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch appointments");
        }finally {
            setListLoading(false);
        }
    };
    const handleGetAppointmentbyId = async (id) => {
        setAppointmentLoading(true);
        try {
            const response = await getAppointmentbyId(id);
            setSelectedAppointment(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch appointments");
        }finally {
            setAppointmentLoading(false);
        }
    };
    const handleCancelAppointment = async (id) => {
        try {
            setCanceling(true);
            const response = await cancelAppointment(id);
            toast.success("Appointment cancelled successfully");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Unable to cancel appointments");
        }finally {
            setCanceling(false);
        }
    };
    const handleGetAvailableSlots = async (id,date) => {
        setSlotLoading(true);
        try {
            const response = await getAvailableSlots(id,date);
            setSlot(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Unable to get available slots");
        }finally {
            setSlotLoading(false);
        }
    };
    const handleCreateAppointment = async (data) => {
        setCreating(true);
        try {
            const response = await createAppointment(data);
            toast.success(response.message);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }finally {
            setCreating(false);
        }
    };
    const handleRescheduleAppointment = async (id,data) => {
        
        try {
            setRescheduling(true);
            const response = await rescheduleAppointment(id,data);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally {
            setRescheduling(false);
        }
    };
    const handleDoctorAppointments = async () => {
        try {
            setDoctorListLoading(true);
            const response = await getDoctorAppointments();
            setDoctorAppointments(response.data?.appointments ?? []);
            return response.data?.appointments ?? [];
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch appointments");
        }finally {
            setDoctorListLoading(false);
        }
    };
    const handleUpdateAppointmentStatus = async (id,status) => {
        
        setUpdating(true);
        try {
            const response = await updateAppointmentStatus(id,status);
            toast.success(response.message);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }finally {
            setUpdating(false);
        }
    };
    const handleCreatePrescription = async (id, data) => {
        setCreatingPrescription(true);
        try {
            const response = await createPrescription(id, data);

            toast.success(response.message);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || "Unable to save prescription");
        } finally {
            setCreatingPrescription(false);
        }
    };




    return{
        handlePatientAppointments,
        Appointments,
        listLoading,
        handleGetAppointmentbyId,
        selectedAppointment,
        appointmentLoading,
        handleCancelAppointment,
        canceling,
        handleGetAvailableSlots,
        slot,
        slotLoading,
        handleCreateAppointment,
        creating,
        handleRescheduleAppointment,
        rescheduling,
        handleDoctorAppointments,
        doctorAppointments,
        doctorListLoading,
        handleUpdateAppointmentStatus,
        updating,
        handleCreatePrescription,
        creatingPrescription
    }

}
