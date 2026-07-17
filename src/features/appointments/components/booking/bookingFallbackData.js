
 import { addDays, format } from "date-fns";
export const bookingDoctorFallback = {
  id: "64a474cda1114da30516502c",
  name: "Dr. Ansh",
  specialization: "Cardiologist",
  consultationFee: 500,
  avatar: "",
};

// date.utils.js

export const generateBookingDates = (days = 7) => {
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(new Date(), index);

    return {
      value: format(date, "yyyy-MM-dd"), // API
      label:
        index === 0
          ? "Today"
          : index === 1
          ? "Tomorrow"
          : format(date, "EEE dd"),
    };
  });
};


;

export const groupSlots = (slots) => {
  if (!slots || slots.length === 0) return [];
  const groups = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  slots.forEach((slot) => {
    const date = new Date(slot);
    const hour = date.getHours();

    const slotData = {
      value: slot,
      label: format(date, "hh:mm a"),
    };

    if (hour < 12) {
      groups.Morning.push(slotData);
    } else if (hour < 17) {
      groups.Afternoon.push(slotData);
    } else {
      groups.Evening.push(slotData);
    }
  });

  return Object.entries(groups)
    .filter(([, slots]) => slots.length > 0)
    .map(([title, slots]) => ({
      title,
      slots,
    }));
};

export const formatBookingDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Select date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatBookingTime = (dateTime) => {
  if (!dateTime) return "Select time";

  return format(new Date(dateTime), "hh:mm a");
};

export const buildAppointmentDateTime = (date, time) => {
  if (!date || !time) return "";

  return new Date(`${date}T${time}:00`).toISOString();
};
