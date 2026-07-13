import { useEffect, useMemo, useState } from "react";
import DoctorCategoryStrip from "../components/DoctorCategoryStrip";
import DoctorFilters from "../components/DoctorFilters";
import DoctorsGrid from "../components/DoctorsGrid";
import { doctorCategories } from "../components/publicDoctorsContent";
import { useDoctor } from "../hooks/useDoctor";


function Doctors({ showSearch = true, insidePatientDashboard = false }) {
  const { doctors, doctorLoading, handleGetAllDoctors } = useDoctor();
  useEffect(() => {
    handleGetAllDoctors();

  }, [])
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const activeCategory = doctorCategories.find(
    (category) => category.id === activeCategoryId
  );
  const visibleDoctors = useMemo(() => {
    if (!activeCategory?.specialty) return doctors;

    return doctors.filter(
      (doctor) =>
        doctor.specialization?.toLowerCase() ===
        activeCategory.specialty.toLowerCase()
    );
  }, [activeCategory, doctors]);






  return (
    <div
      className={
        insidePatientDashboard
          ? "w-full px-1 pb-1"
          : "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Doctors
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Find the Best Doctors
            </h1>
            <p className="mt-2 text-[15px] text-slate-600">
              Book an appointment with top-rated doctors near you.
            </p>
          </div>


        </div>

        <DoctorFilters showSearch={showSearch} />
        <DoctorCategoryStrip
          categories={doctorCategories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
        />
        <DoctorsGrid doctors={visibleDoctors}
          basePath={
            insidePatientDashboard
              ? "/profile/doctors"
              : "/doctors"
          }
        />
      </div>
    </div>
  );
}

export default Doctors;
