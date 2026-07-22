import api from "./axios";

export const patientAppointments = async({
  page = 1,
  limit = 10,
  

}={})=>{
    const response = await api.get("/appointment/",{
        params:{
            page,
            limit,
        }
    });
    return response.data;
}
export const getAppointmentbyId = async (id)=>{
    const response = await api.get(`/appointment/${id}`);
    return response.data;
}
export const cancelAppointment = async (id)=>{
    const response = await api.patch(`/appointment/${id}/cancel`);
    return response.data;
} 
export const getAvailableSlots = async (doctorId, date) => {
  const response = await api.get("/appointment/slots", {
    params: {
      doctorId,
      date,
    },
  });

  return response.data;
};
export const createAppointment = async (data) => {
  const response = await api.post("/appointment/", data);
  return response.data;
}
export const rescheduleAppointment = async (id, data) => {
  const response = await api.patch(`/appointment/${id}/reschedule`, data);
  return response.data;
}

export const getDoctorAppointments = async ({
  page = 1,
  limit = 10,
} = {}) => {
  const response = await api.get("/appointment/doctor", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};
 export const updateAppointmentStatus = async (id , status) => {
  const response = await api.patch(`/appointment/${id}/status`,
  {status});
  return response.data;
}

export const createPrescription = async (id , data) => {
  const response = await api.patch(`/appointment/${id}/prescription`,
  data);
  return response.data;
}