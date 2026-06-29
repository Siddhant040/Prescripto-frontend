import Header from "../features/patients/components/header";
import Footer from "../components/layouts/footer";
import { Outlet } from "react-router-dom";


const PatientLayout = () => {
  

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f4fbf8_0%,_#f8fafc_38%,_#ffffff_100%)] text-slate-950">
      <Header />

      <main>
        <Outlet />
      </main>

      

      <Footer />

     
    </div>
  );
};

export default PatientLayout;