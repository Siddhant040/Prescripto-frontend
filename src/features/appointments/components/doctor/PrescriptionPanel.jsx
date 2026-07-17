import { useForm } from "react-hook-form";
import { useAppointments } from "../../hooks/useAppointment";
import { useParams } from "react-router-dom";

const PrescriptionPanel = () => {
  const { id } = useParams();
  const {handleCreatePrescription,creatingPrescription} = useAppointments();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      diagnosis: "",
      medicine: "",
      instructions: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      await handleCreatePrescription(id,data);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = creatingPrescription;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
    >
      <div>
  <label className="text-sm font-semibold text-slate-700">
    Diagnosis
  </label>

  <textarea
    rows={3}
    {...register("diagnosis", {
      required: "Diagnosis is required",
    })}
    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
    placeholder="Enter diagnosis"
  />

  {errors.diagnosis && (
    <p className="mt-1 text-sm text-red-500">
      {errors.diagnosis.message}
    </p>
  )}
</div>
<div>
  <label className="text-sm font-semibold text-slate-700">
    Instructions
  </label>

  <textarea
    rows={4}
    {...register("instructions",{
      required: "Instructions are required",
    })}
    placeholder="Additional instructions"
    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
  />
  {errors.instructions && (
  <p className="mt-1 text-sm text-red-500">
    {errors.instructions.message}
  </p>
)}
</div>
<div>
  <label className="text-sm font-semibold text-slate-700">
    Medicine
  </label>

 <textarea
  rows={4}
  {...register("medicine", {
    required: "Medicine is required",
  })}
  placeholder="Prescribed medicine"
    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
  
/>

{errors.medicine && (
  <p className="mt-1 text-sm text-red-500">
    {errors.medicine.message}
  </p>
)}
</div>
<button
  type="submit"
  disabled={isLoading}
  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {isLoading ? "Saving..." : "Save Prescription"}
</button>
    </form>
  );
};




export default PrescriptionPanel;
