const DoctorAppointmentActions = ({
   status,
   onUpdateStatus,
   onCancel,
   id
   
   

 }) => {
  console.log("id",id)
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Actions
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          disabled={status !== "pending"}
          onClick={() => onUpdateStatus(id,"confirmed")}
          className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm
        </button>
        <button
          type="button"
          disabled={status !== "confirmed"}
          onClick={() => onUpdateStatus(id,"completed")}
          className="inline-flex h-11 items-center justify-center rounded-full bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Complete
        </button>
        <button
          type="button"
          disabled={status === "completed" || status === "cancelled"}
          onClick={() => onCancel(id)}
          className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export default DoctorAppointmentActions;
