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
  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    experience: "",
    fee: "",
    sort: "popular",
  });
  const activeCategory = doctorCategories.find(
    (category) => category.id === activeCategoryId
  );
  const visibleDoctors = useMemo(() => {
    let filtered = [...doctors];

    // Category
    if (activeCategory?.specialty) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialization?.toLowerCase() ===
          activeCategory.specialty.toLowerCase()
      );
    }

    // Search
    if (filters.search.trim()) {
      const search = filters.search.toLowerCase();

      filtered = filtered.filter(
        (doctor) =>
          doctor.user?.name?.toLowerCase().includes(search) ||
          doctor.specialization?.toLowerCase().includes(search)
      );
    }

    // Specialization
    if (filters.specialization) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialization === filters.specialization
      );
    }

    // Experience
    if (filters.experience) {
      filtered = filtered.filter(
        (doctor) => doctor.experience >= Number(filters.experience)
      );
    }

    // Fee
    if (filters.fee) {
      switch (filters.fee) {
        case "700":
          filtered = filtered.filter(
            (doctor) => doctor.consultationFee < 700
          );
          break;

        case "900":
          filtered = filtered.filter(
            (doctor) =>
              doctor.consultationFee >= 700 &&
              doctor.consultationFee <= 900
          );
          break;
        case "1000":
          filtered = filtered.filter(
            (doctor) => doctor.consultationFee > 900
          );
          break;
      }
    }

    // Sort
    switch (filters.sort) {
  case "feeLow":
    filtered = [...filtered].sort(
      (a, b) => a.consultationFee - b.consultationFee
    );
    break;

  case "feeHigh":
    filtered = [...filtered].sort(
      (a, b) => b.consultationFee - a.consultationFee
    );
    break;

  case "rating":
    filtered = [...filtered].sort(
      (a, b) => b.rating - a.rating
    );
    break;

  default:
    break;
}

return filtered;
  }, [doctors, activeCategory, filters]);
  const specializations = useMemo(() => {
    return [...new Set(doctors.map((d) => d.specialization))]
      .filter(Boolean)
      .sort();
  }, [doctors]);

  const experienceOptions = [
    { value: "5", label: "5+ Years" },
    { value: "10", label: "10+ Years" },
  ];

  const feeOptions = [
    { value: "700", label: "Under ₹700" },
    { value: "900", label: "₹700 - ₹900" },
    { value: "1000", label: "Above ₹900" },
  ];

  const sortOptions = [
    { value: "popular", label: "Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "feeLow", label: "Fee: Low to High" },
    { value: "feeHigh", label: "Fee: High to Low" },
  ];

  const categoriesWithCount = useMemo(() => {
  return doctorCategories.map((category) => {
    if (!category.specialty) {
      return {
        ...category,
        count: doctors.length,
      };
    }

    return {
      ...category,
      count: doctors.filter(
        (doctor) =>
          doctor.specialization?.toLowerCase() ===
          category.specialty.toLowerCase()
      ).length,
    };
  });
}, [doctors]);

  if (doctorLoading) return <h1>Loading...</h1>






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

        <DoctorFilters
          showSearch={showSearch}
          filters={filters}
          setFilters={setFilters}
          specializations={specializations}
          experienceOptions={experienceOptions}
          feeOptions={feeOptions}
          sortOptions={sortOptions}
        />
        <DoctorCategoryStrip
          categories={categoriesWithCount}
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
