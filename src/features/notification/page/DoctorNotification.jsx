import { Bell, ChevronLeft, ChevronRight, CheckCheck } from "lucide-react";
import NotificationCard from "../component/notificationCard";
import { fallbackNotifications } from "../component/fallbackdata";
// const notifications = [...fallbackNotifications];
import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const DoctorNotification = () => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { handleGetNotifications,
     notificationLoading,
      notificationPagination,
       notification, 
       handleReadNotification,
        handleReadAllNotification,
      handleDeleteNotification } = useNotification();
  const notifications = notification
  const { page, limit, total, unread } = notificationPagination
  const totalPages = Math.max(1, Math.ceil(total / (notificationPagination.limit ?? 10)));
  useEffect(() => {
    handleGetNotifications(currentPage, limit);
  }, [currentPage])
  if (notificationLoading) {
    return <div>Loading...</div>
  }
  if (!notifications) {
    return <div>Loading...</div>
  }
  // console.log(page,limit,total,unread);
  console.log("notifications", notifications);

  const onReadNotification = async (id) => {
    try {
      await handleReadNotification(id);
      handleGetNotifications(currentPage, limit);
    } catch (error) {
      console.log(error);
    }
  }
  const handleMarkAllAsRead = async () => {
    try {
      await handleReadAllNotification();
      handleGetNotifications(currentPage, limit);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = async (id) => {
    try {
      await handleDeleteNotification(id);
      handleGetNotifications(currentPage, limit);
    } catch (error) {
      console.log(error);
    }
  }
  const handleNavigate = (notification) => {
  switch (notification.entityType) {
    case "appointment":
      navigate(`/doctor-dashboard/appointments/${notification.entityId}`);
      break;

    case "payment":
      navigate("/doctor-dashboard/payments");
      break;

    case "review":
      navigate("/doctor-dashboard/reviews");
      break;

    default:
      break;
  }
};
  return (
    <section className="flex h-[620px] flex-col rounded-[24px] border border-emerald-100 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
            Notifications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Activity Center
          </h2>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-3">
          <div className="rounded-full bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-700">
            {total} Notifications
          </div>

          {notificationPagination.unread > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-2.5 text-sm font-medium text-emerald-700 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2">

        {notifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <Bell className="h-9 w-9 text-emerald-600" />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              No Notifications
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
              You're all caught up. New appointments, payments,
              reviews and system updates will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onRead={onReadNotification}
                onDelete={handleDelete}
                handleNavigate={handleNavigate}
              />
            ))}
          </div>
        )}

      </div>

      {notifications.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button className="flex h-10 min-w-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white">
              {page}
            </button>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>

        </div>
      )}
    </section>
  );
};

export default DoctorNotification;