import Header from "../features/patients/components/header";
import PatientNavSidebar from "../features/patients/components/PatientNavSidebar";
import { Outlet } from "react-router-dom";


const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f0faf6_0%,_#f7fbf9_28%,_#ffffff_100%)] text-slate-950">
      <div className="mx-auto max-w-[1600px] px-3 py-3">
        <div className="grid items-start gap-4 xl:grid-cols-[256px_minmax(0,1fr)]">
          <PatientNavSidebar />

          <div className="min-w-0">
            <Header />
            <main className="min-w-0 pt-2">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;
