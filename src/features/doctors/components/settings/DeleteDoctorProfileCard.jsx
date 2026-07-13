import { Trash2, TriangleAlert } from "lucide-react";

const DeleteDoctorProfileCard = ({ onDelete, deleting = false }) => {
  return (
    <section className="  rounded-[20px] border border-red-100 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <TriangleAlert className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-red-600">
              Danger zone
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
              Delete doctor profile
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This action removes the doctor profile and returns the account to
              patient access. Existing patient account information remains
              available.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-red-200 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? "Deleting..." : "Delete Doctor Profile"}
        </button>
      </div>
    </section>
  );
};

export default DeleteDoctorProfileCard;
