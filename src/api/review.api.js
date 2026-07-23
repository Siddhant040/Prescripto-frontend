import api from "./axios";

export const  getReviewsbyId = async (id)=>{
    const response = await api.get(`/review/${id}`);
    return response.data;
}
export const createReview = async (data)=>{
    const response = await api.post(`/review/`, data);
    return response.data;
    
}
export const deleteReview = async (id)=>{
    const response = await api.delete(`/review/${id}`);
    return response.data;
}
export const updateReview = async (id,data)=>{
    const response = await api.patch(`/review/${id}`, data);
    return response.data;
}

export const getPatientReview = async (id)=>{
    const response = await api.get(`/review/me`);
    return response.data;
}  
export const getDoctorReview = async (id)=>{
    const response = await api.get(`/review/doctor/me`);
    return response.data;
} 