import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllDoctors } from "../../../api/doctor.api";
import { patientAppointments } from "../../../api/appointment.api";

export const usePatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [appointmentsResponse, doctorsResponse] = await Promise.all([
          patientAppointments({ page: 1, limit: 50 }),
          getAllDoctors({ page: 1, limit: 6 }),
        ]);

        if (!isMounted) return;

        const appointmentData = appointmentsResponse.data;
        console.log("appointmentData", appointmentData);
        const doctorData = doctorsResponse.data;

        setAppointments(
          appointmentData?.appointments ??
            appointmentData?.docs ??
            (Array.isArray(appointmentData) ? appointmentData : [])
        );
        setDoctors(
          doctorData?.doctors ??
            doctorData?.docs ??
            (Array.isArray(doctorData) ? doctorData : [])
        );
      } catch (err) {
        if (!isMounted) return;

        setError(err);
        toast.error("Unable to load patient dashboard");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    appointments,
    doctors,
    loading,
    error,
  };
};
