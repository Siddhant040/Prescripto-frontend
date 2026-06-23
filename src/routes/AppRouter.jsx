import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import Doctors from "../pages/doctors/Doctors";
import DoctorDetails from "../pages/doctors/DoctorDetails";
import Appointments from "../pages/appointments/Appointments";
import Profile from "../pages/patient/Profile";
import PaymentTest from "../pages/payment/PaymentTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      {
        path: "doctors/:id",
        element: <DoctorDetails />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "payment-test",
        element: <PaymentTest />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "doctor-dashboard",
        element: <DoctorDashboard />,
      },
    ],
  },
]);

export default router;
