import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDoctorAppointments } from "../../../api/appointment.api";
import { getLoginDoctor } from "../../../api/doctor.api";
import { getDoctorReview } from "../../../api/review.api";

export const useDoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [doctorResponse, appointmentsResponse, reviewsResponse] =
          await Promise.all([
            getLoginDoctor(),
            getDoctorAppointments({ page: 1, limit: 50 }),
            getDoctorReview(),
          ]);

        if (!isMounted) return;

        setDoctor(doctorResponse.data ?? null);
        
        setAppointments(
          appointmentsResponse.data?.appointments ??
            appointmentsResponse.data?.docs ??
            []
        );
        setReviews(
          reviewsResponse.data?.reviews ?? reviewsResponse.data?.docs ?? []
        );
      } catch (err) {
        if (!isMounted) return;

        setError(err);
        toast.error("Unable to load doctor dashboard");
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
    doctor,
    appointments,
    reviews,
    loading,
    error,
  };
};
