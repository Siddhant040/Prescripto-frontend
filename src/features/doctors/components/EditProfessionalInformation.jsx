import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function EditProfessionalInformation({
  doctor,
  updateUserProfile,
  updating,
  onCancel,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      specialization: doctor?.specialization || "",
      experience: doctor?.experience || "",
      consultationFee: doctor?.consultationFee || "",
      qualifications: doctor?.qualifications || "",
      clinicAddress: doctor?.clinicAddress || "",
      bio: doctor?.bio || "",
    },
  });

  useEffect(() => {
    if (!doctor) return;

    reset({
      specialization: doctor.specialization || "",
      experience: doctor.experience || "",
      consultationFee: doctor.consultationFee || "",
      qualifications: doctor.qualifications || "",
      clinicAddress: doctor.clinicAddress || "",
      bio: doctor.bio || "",
    });
  }, [doctor, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUserProfile(data);

      toast.success(response?.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] xl:col-span-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between gap-4">
  <div>
    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
      Professional Information
    </p>

    <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
      Doctor Details
    </h2>
  </div>

  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={onCancel}
      className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={updating}
      className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
    >
      {updating ? "Saving..." : "Save Changes"}
    </button>
  </div>
</div>

<div className="mt-4 grid gap-3.5 md:grid-cols-2">
  <div>
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      Specialization
    </label>

    <input
      {...register("specialization")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.specialization && (
      <p className="mt-1 text-sm text-red-500">
        {errors.specialization.message}
      </p>
    )}
  </div>

  <div>
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      Experience (Years)
    </label>

    <input
      type="number"
      {...register("experience")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.experience && (
      <p className="mt-1 text-sm text-red-500">
        {errors.experience.message}
      </p>
    )}
  </div>

  <div>
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      Consultation Fee
    </label>

    <input
      type="number"
      {...register("consultationFee")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.consultationFee && (
      <p className="mt-1 text-sm text-red-500">
        {errors.consultationFee.message}
      </p>
    )}
  </div>

  <div>
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      Qualifications
    </label>

    <input
      {...register("qualifications")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.qualifications && (
      <p className="mt-1 text-sm text-red-500">
        {errors.qualifications.message}
      </p>
    )}
  </div>

  <div className="md:col-span-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      Clinic Address
    </label>

    <input
      {...register("clinicAddress")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.clinicAddress && (
      <p className="mt-1 text-sm text-red-500">
        {errors.clinicAddress.message}
      </p>
    )}
  </div>

  <div className="md:col-span-2">
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      About
    </label>

    <textarea
      rows={5}
      {...register("bio")}
      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
    />

    {errors.bio && (
      <p className="mt-1 text-sm text-red-500">
        {errors.bio.message}
      </p>
    )}
  </div>
</div>
      </form>
    </section>
  );
}


  

export default EditProfessionalInformation;
