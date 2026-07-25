import { getNotifications, readNotification,readAllNotification, deleteNotification } from "../../../api/notification.api";
import { useState } from "react";

export const useNotification = () => {
    const [notification, setNotifications] = useState([]); 
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationPagination, setNotificationPagination] = useState({});
    const[readloading, setReadLoading] = useState(false);
    const [readAll, setReadAll] = useState(false);
    const [deleting, setDeleting] = useState(false);


    const handleGetNotifications = async (page = 1, limit = 10) => {
        try {
            setNotificationLoading(true);
            const response = await getNotifications({page, limit});
            setNotifications(response.data?.notifications ?? []);
            setNotificationPagination({
                page: response.data.page,
                limit: response.data.limit,
                total: response.data.total,
                unread: response.data.unreadCount
            });

        } finally {
            setNotificationLoading(false);
        }
    };
    const handleReadNotification = async (id) => {
        setReadLoading(true);
        try {
            const response = await readNotification(id);
            return response.data;
        } finally {
            setReadLoading(false);
        }
    };
    const handleReadAllNotification = async () => {
        setReadAll(true);
        try {
            const response = await readAllNotification();
            return response.data;
        } finally {
            setReadAll(false);
        }
    };
    const handleDeleteNotification = async (id) => {
        setDeleting(true);
        try {
            const response = await deleteNotification(id);
            return response.data;
        } finally {
            setDeleting(false);
        }
    };

    return { notification, notificationLoading, notificationPagination, handleGetNotifications,
        handleReadNotification, readloading, handleReadAllNotification, readAll, handleDeleteNotification, deleting
     };
}