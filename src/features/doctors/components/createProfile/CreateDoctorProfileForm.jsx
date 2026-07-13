import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CreateDoctorField from "./CreateDoctorField";
import { useDoctor } from "../../hooks/useDoctor";
import { useContext } from "react";
import { AuthContext } from "../../../../shared/context/AuthContext";


import { useNavigate } from "react-router-dom";


const specializations = [
  "General Physician",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedic",
  "Pediatrics",
  "Dentistry",
  "ENT Specialist",
];

const CreateDoctorProfileForm = () => {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { handleCreateDoctor, creatingDoctor } = useDoctor();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      specialization: "",
      experience: "",
      consultationFee: "",
      qualifications: "",
      clinicAddress: "",
      bio: "",
    },
  });



  const onSubmit = async (data) => {
    try {
      const response = await handleCreateDoctor(data);


      toast.success(response?.message || "Doctor profile created successfully");
      reset();
      await checkAuth(); // Refresh user roles

      navigate("/doctor-dashboard", { replace: true });

    } catch (error) {
      toast.error("Unable to create doctor");
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-5xl rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Professional details
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
          Practice information
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <CreateDoctorField
          label="Specialization"
          error={errors.specialization}
        >
          <select
            {...register("specialization", {
              required: "Specialization is required",
              minLength: {
                value: 2,
                message: "Specialization must be at least 2 characters",
              },
            })}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          >
            <option value="">Select specialization</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </CreateDoctorField>

        <div className="grid gap-4 md:grid-cols-2">
          <CreateDoctorField
            label="Experience"
            hint="Years of professional practice"
            error={errors.experience}
          >
            <input
              type="number"
              min="0"
              placeholder="5"
              {...register("experience", {
                required: "Experience is required",
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
              })}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
            />
          </CreateDoctorField>

          <CreateDoctorField
            label="Consultation Fee"
            hint="Amount in rupees"
            error={errors.consultationFee}
          >
            <input
              type="number"
              min="0"
              placeholder="700"
              {...register("consultationFee", {
                required: "Consultation fee is required",
                min: {
                  value: 0,
                  message: "Consultation fee cannot be negative",
                },
              })}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
            />
          </CreateDoctorField>
        </div>

        <CreateDoctorField
          label="Qualifications"
          hint="Separate qualifications with commas"
          error={errors.qualifications}
        >
          <input
            type="text"
            placeholder="MBBS, MD Cardiology"
            {...register("qualifications", {
              required: "Qualifications are required",
              validate: (value) =>
                value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean).length > 0 ||
                "Add at least one qualification",
            })}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          />
        </CreateDoctorField>

        <CreateDoctorField
          label="Clinic Address"
          error={errors.clinicAddress}
        >
          <textarea
            rows={3}
            placeholder="Clinic name, city, state, pincode"
            {...register("clinicAddress", {
              required: "Clinic address is required",
            })}
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          />
        </CreateDoctorField>

        <CreateDoctorField
          label="Bio"
          hint="Optional. Maximum 500 characters."
          error={errors.bio}
        >
          <textarea
            rows={5}
            maxLength={500}
            placeholder="Write a short introduction about your practice"
            {...register("bio", {
              maxLength: {
                value: 500,
                message: "Bio must be 500 characters or less",
              },
            })}
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          />
        </CreateDoctorField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Preparing..." : "Create Doctor Profile"}
        </button>
      </form>
    </section>
  );
};

export default CreateDoctorProfileForm;
