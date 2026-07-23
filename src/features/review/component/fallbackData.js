export const fallbackReviews = [
  {
    id: "review_1",
    rating: 5,
    review:
      "Excellent consultation. The doctor explained everything clearly and answered all my questions with patience.",
    createdAt: "2026-07-20T10:30:00.000Z",
    updatedAt: "2026-07-20T10:30:00.000Z",
    isEdited: false,

    doctor: {
      id: "doctor_1",
      name: "Dr. Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=47",
      specialization: "Cardiologist",
      consultationFee: 1000,
    },

    appointment: {
      id: "appointment_1",
    },
  },

  {
    id: "review_2",
    rating: 4,
    review:
      "Professional doctor with a friendly attitude. The treatment was effective and the clinic staff were helpful.",
    createdAt: "2026-07-18T15:45:00.000Z",
    updatedAt: "2026-07-19T09:15:00.000Z",
    isEdited: true,

    doctor: {
      id: "doctor_2",
      name: "Dr. Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=15",
      specialization: "Dermatologist",
      consultationFee: 800,
    },

    appointment: {
      id: "appointment_2",
    },
  },

  {
    id: "review_3",
    rating: 5,
    review:
      "Very knowledgeable doctor. Diagnosis was accurate and medicines started showing results within a few days.",
    createdAt: "2026-07-15T11:20:00.000Z",
    updatedAt: "2026-07-15T11:20:00.000Z",
    isEdited: false,

    doctor: {
      id: "doctor_3",
      name: "Dr. Emily Johnson",
      avatar: "",
      specialization: "Neurologist",
      consultationFee: 1200,
    },

    appointment: {
      id: "appointment_3",
    },
  },

  {
    id: "review_4",
    rating: 3,
    review:
      "Consultation was good, although the waiting time was longer than expected. Overall, a satisfactory experience.",
    createdAt: "2026-07-12T14:10:00.000Z",
    updatedAt: "2026-07-12T14:10:00.000Z",
    isEdited: false,

    doctor: {
      id: "doctor_4",
      name: "Dr. David Miller",
      avatar: "https://i.pravatar.cc/150?img=33",
      specialization: "Orthopedic Surgeon",
      consultationFee: 1500,
    },

    appointment: {
      id: "appointment_4",
    },
  },

  {
    id: "review_5",
    rating: 5,
    review:
      "Highly recommended. The doctor carefully listened to my concerns and provided a detailed treatment plan.",
    createdAt: "2026-07-08T09:00:00.000Z",
    updatedAt: "2026-07-09T13:20:00.000Z",
    isEdited: true,

    doctor: {
      id: "doctor_5",
      name: "Dr. Olivia Taylor",
      avatar: "https://i.pravatar.cc/150?img=52",
      specialization: "Pediatrician",
      consultationFee: 900,
    },

    appointment: {
      id: "appointment_5",
    },
  },
];
export const fallbackDoctorReviews = [
  {
    id: "review-1",
    rating: 5,
    review:
      "Excellent consultation. The doctor explained my condition clearly and answered every question patiently.",
    isEdited: false,
    isDeleted: false,
    createdAt: "2026-07-23T09:30:00.000Z",
    updatedAt: "2026-07-23T09:30:00.000Z",

    patient: {
      id: "patient-1",
      name: "Riya Sharma",
      email: "riya@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },

    appointment: {
      id: "appointment-1",
      date: "2026-07-20T10:00:00.000Z",
      status: "completed",
    },
  },

  {
    id: "review-2",
    rating: 4,
    review:
      "Very professional and friendly. Waiting time was a little longer than expected, but the treatment was worth it.",
    isEdited: false,
    isDeleted: false,
    createdAt: "2026-07-22T14:20:00.000Z",
    updatedAt: "2026-07-22T14:20:00.000Z",

    patient: {
      id: "patient-2",
      name: "Amit Verma",
      email: "amit@example.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },

    appointment: {
      id: "appointment-2",
      date: "2026-07-19T16:30:00.000Z",
      status: "completed",
    },
  },

  {
    id: "review-3",
    rating: 5,
    review:
      "One of the best healthcare experiences I've had. Highly recommended.",
    isEdited: true,
    isDeleted: false,
    createdAt: "2026-07-21T11:45:00.000Z",
    updatedAt: "2026-07-22T08:15:00.000Z",

    patient: {
      id: "patient-3",
      name: "Neha Gupta",
      email: "neha@example.com",
      avatar: "",
    },

    appointment: {
      id: "appointment-3",
      date: "2026-07-18T09:00:00.000Z",
      status: "completed",
    },
  },

  {
    id: "review-4",
    rating: 3,
    review:
      "Consultation was helpful, but I expected a little more explanation regarding the prescribed medicines.",
    isEdited: false,
    isDeleted: false,
    createdAt: "2026-07-20T17:10:00.000Z",
    updatedAt: "2026-07-20T17:10:00.000Z",

    patient: {
      id: "patient-4",
      name: "Rahul Singh",
      email: "rahul@example.com",
      avatar: "",
    },

    appointment: {
      id: "appointment-4",
      date: "2026-07-17T14:00:00.000Z",
      status: "completed",
    },
  },

  {
    id: "review-5",
    rating: 5,
    review:
      "Very caring doctor. The diagnosis was accurate, and I recovered quickly after following the treatment plan.",
    isEdited: false,
    isDeleted: false,
    createdAt: "2026-07-19T13:00:00.000Z",
    updatedAt: "2026-07-19T13:00:00.000Z",

    patient: {
      id: "patient-5",
      name: "Priya Mehta",
      email: "priya@example.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },

    appointment: {
      id: "appointment-5",
      date: "2026-07-16T11:30:00.000Z",
      status: "completed",
    },
  },
];