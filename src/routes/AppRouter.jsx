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
import DoctorDetails from "../features/doctors/page/DoctorDetails";
import Appointments from "../features/appointments/page/Appointments";
import Profile from "../features/patients/page/Dashboard";
import PaymentTest from "../features/payments//page/Dashboard"

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
        ],
      },
    ],
  },
]);

export default router;


