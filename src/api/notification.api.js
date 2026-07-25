import api from "./axios";

export const getNotifications = async (params) => {
    const response = await api.get("/notification/me",{
        params
    });
    return response.data;
};
export const readNotification = async (id) => {
    const response = await api.patch(`/notification/${id}/read`);
    return response.data;
};
export const readAllNotification = async () => {
    const response = await api.patch(`/notification/read-all`);
    return response.data;
};
export const deleteNotification = async (id) => {
    const response = await api.delete(`/notification/${id}`);
    return response.data;
}