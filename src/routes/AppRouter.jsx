import {
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";
import PatientLayout from "../layouts/patientLayout";
import ProtectedRoutes from "./protectedRoutes";
import About from "../features/about/page/About"
import Contact from "../features/contact/page/Contact"
import Home from "../features/home/page/Home";
import Login from "../features/auth/page/Login";
import Register from "../features/auth/page/Register";
import DoctorDashboard from "../features/doctors/page/Dashboard";
import ForgotPassword from "../features/auth/page/ForgotPassword";
import ResetPassword from "../features/auth/page/Resetpassword";
import Doctors from "../features/doctors/page/Doctors"
import PublicDoctorDetails from "../features/doctors/page/PublicDoctorDetails";
import Appointments from "../features/appointments/page/Appointments";
import Profile from "../features/patients/page/Dashboard";
import PatientProfilePage from "../features/patients/page/PatientProfilePage";
import PaymentTest from "../features/payments//page/Dashboard"
import AccountSettingPage from "../features/patients/page/AccountSettingPage";
import PatientDoctorDetails from "../features/doctors/page/PatientDoctorDetails";
import DoctorLayout from "../layouts/doctorLayout";
import DoctorProfile from "../features/doctors/page/doctorProfile";
import DoctorSettingPage from "../features/doctors/page/DoctorSettingPage";
import CreateDoctorProfile from "../features/doctors/page/CreateDoctorProfile";
import AppointmentDetailPage from "../features/appointments/page/AppointmentDetailPage";
import BookingPage from "../features/appointments/page/BookingPage";
import DoctorAppointments from "../features/appointments/page/DoctorAppointments";
import DoctorAppointmentDetailPage from "../features/appointments/page/DoctorAppointmentDetailPage";

//         const router = createBrowserRouter([
//   {
//   path: "/",
//   element: <MainLayout />,
//   children: [
//     {
//       index: true,
//       element: <Home />,
//     },
//     {
//       path: "login",
//       element: <Login />,
//     },
//     {
//       path: "register",
//       element: <Register />,
//     },
//     {
//       path: "doctors",
//       element: <Doctors />,
//     },
//     {
//       path: "about",
//       element: <About />,
//     },
//     {
//       path: "contact",
//       element: <Contact />,
//     },
//     {
//       path: "doctors/:id",
//       element: <DoctorDetails />,
//     },
//     {
//       path: "payment-test",
//       element: <PaymentTest />,
//     },

//     // Protected routes
//     {
//       element: <ProtectedRoutes />,
//       children: [
//         {
//           path: "profile",
//           element: <PatientLayout />,
//           children: [
//             {
//               index: true,
//               element: <Profile />,
//             },
//           ],
//         },
//         {
//           path: "appointments",
//           element: <Appointments />,
//         },

//         {
//           path: "doctor-dashboard",
//           element: <DoctorDashboard />,
//         },
//       ],
//     },
//   ],
// }
// ]);

// export default router;


const router = createBrowserRouter([
  // Public Website
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "doctors/:id",
        element: <PublicDoctorDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // Protected Patient Area
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "profile",
        element: <PatientLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "appointments",
            element: <Appointments />,

          },
          {
            path: "appointments/:id",
            element: <AppointmentDetailPage />,
          },
          {
            path: "me",
            element: <PatientProfilePage />,
          },
          {
            path: "settings",
            element: <AccountSettingPage />,
          },
          {
            path: "create-doctor-profile",
            element: <CreateDoctorProfile />,
          },


          // LIST PAGE
          {
            path: "doctors",
            element: (
              <Doctors
                showSearch={false}
                insidePatientDashboard
              />
            ),
          },

          // DETAILS PAGE
          {
            path: "doctors/:id",
            element: <PatientDoctorDetails />,
          },

          {
            path: "doctors/:id/booking",
            element: <BookingPage />,
          },

        ],
      },

      {
        path: "doctor-dashboard",
        element: <DoctorLayout />,
        children: [
          {
            index: true,
            element: <DoctorDashboard />,
          },
          {
            path: "doctor-profile",
            element: <DoctorProfile />,
          },
          {
            path: "doctor-settings",
            element: <DoctorSettingPage />,
          },
          {
            path: "appointments",
            element: <DoctorAppointments />,
          },
          {
            path: "appointments/:id",
            element: <DoctorAppointmentDetailPage />,
          },

        ],
      },
    ],
  }
]);


export default router;
