
import {
  Bell,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  CreditCard,
  Star,
  BadgeCheck,
  ArrowRight,
  MoreVertical,
  Check,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";


const notificationConfig = {
  appointment_booked: {
    icon: CalendarClock,
    color: "bg-emerald-50 text-emerald-700",
    button: "View Appointment",
  },

  appointment_confirmed: {
    icon: CalendarCheck,
    color: "bg-emerald-50 text-emerald-700",
    button: "View Appointment",
  },

  appointment_cancelled: {
    icon: CalendarX,
    color: "bg-red-50 text-red-600",
    button: "View Appointment",
  },

  payment_success: {
    icon: CreditCard,
    color: "bg-sky-50 text-sky-700",
    button: "View Payment",
  },

  payment_failed: {
    icon: CreditCard,
    color: "bg-red-50 text-red-600",
    button: "View Payment",
  },

  review_received: {
    icon: Star,
    color: "bg-amber-50 text-amber-600",
    button: "View Review",
  },

  doctor_verified: {
    icon: BadgeCheck,
    color: "bg-violet-50 text-violet-700",
    button: "View Profile",
  },

  system: {
    icon: Bell,
    color: "bg-slate-100 text-slate-700",
    button: "View",
  },
};

const NotificationCard = ({ notification,onRead,onDelete,handleNavigate }) => {
  const [openMenu, setOpenMenu] = useState(false);
 

  const config =
    notificationConfig[notification.type] ||
    notificationConfig.system;

  const Icon = config.icon;

  // const handleNavigate = () => {
  //   switch (notification.entityType) {
  //     case "appointment":
  //       navigate(`/profile/appointments/${notification.entityId}`);
  //       break;

  //     case "review":
  //       navigate(`/doctor/appointments/${notification.entityId}`);
  //       break;

  //     case "payment":
  //       navigate("/payments");
  //       break;

  //     case "doctor":
  //       navigate("/doctor/profile");
  //       break;

  //     default:
  //       break;
  //   }
  // };
  const handleReadNotification =  (id) => {
   if (!notification.isRead) {
     onRead(id);
     
   }
   setOpenMenu(false);
   handleNavigate(notification);
  };

  return (
    <article
      className={`rounded-[22px] border p-5 transition-all duration-200 hover:border-emerald-200 hover:shadow-md ${
        notification.isRead
          ? "border-slate-200 bg-white"
          : "border-emerald-200 bg-emerald-50/30"
      }`}
    >
      <div className="flex items-start gap-4">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${config.color}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <h3 className="text-[15px] font-semibold text-slate-900">
                {notification.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {notification.message}
              </p>

            </div>

            <div className="relative flex items-center gap-2">

  {!notification.isRead && (
    <span className="h-3 w-3 rounded-full bg-emerald-500" />
  )}

  <button
    onClick={() => setOpenMenu((prev) => !prev)}
    className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
  >
    <MoreVertical className="h-5 w-5" />
  </button>

  {openMenu && (
    <div className="absolute right-0 top-8 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

      {!notification.isRead && (
        <button
          onClick={() => {
            onRead(notification.id);
            setOpenMenu(false);
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
        >
          <Check className="h-4 w-4 text-emerald-600" />
          Mark as read
        </button>
      )}

      <button
        onClick={() => {
          onDelete(notification.id);
          setOpenMenu(false);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>

    </div>
  )}

</div>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-xs font-medium text-slate-500">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </span>

            <button
              onClick={() => handleReadNotification(notification.id)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              {config.button}

              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </div>

      </div>
    </article>
  );
};

export default NotificationCard;