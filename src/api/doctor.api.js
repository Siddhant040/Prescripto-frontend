import api from "./axios";

export const getAllDoctors = async () => {
    const response = await api.get("/doctor/");
    return response.data;
};

export const getDoctorbyId = async (id) => {
    const response = await api.get(`/doctor/${id}`);
    return response.data;
};
export const getReviewsbyId = async (id)=>{
    const response = await api.get(`/review/doctor/${id}`);
    return response.data;
}
export const getLoginDoctor = async () => {
    const response = await api.get("/doctor/me");
    return response.data;
};
export const updateDoctorProfile = async (data)=>{
    const response = await api.patch("/doctor/", data);
    return response.data;
}
export const updateDoctorAvailability = async (data)=>{
    const response = await api.patch("/doctor/availability", data);
    return response.data;

}
export const deleteDoctor = async ()=>{
    const response = await api.delete("/doctor/");
    return response.data;
}
export const createDoctor = async (data)=>{
    const response = await api.post("/doctor/", data);
    return response.data;
}
export const updateSlots = async (data)=>{
    const response = await api.patch("/doctor/slot-availability", data);
    return response.data;
}