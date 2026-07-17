import {
  ClipboardPlus,
  Pill,
  FileText,
} from "lucide-react";

const PrescriptionCard = ({ prescription }) => {
  if (!prescription) {
  return (
    <section className="rounded-[20px] border border-dashed border-slate-200 bg-white p-8 text-center">
      <ClipboardPlus
        className="mx-auto text-slate-400"
        size={32}
      />

      <h3 className="mt-4 text-lg font-semibold text-slate-700">
        No Prescription Yet
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        The doctor hasn't added a prescription for this appointment.
      </p>
    </section>
  );
}

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        <ClipboardPlus size={18} />
        Prescription
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText size={16} />
            Diagnosis
          </div>

          <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            {prescription.diagnosis || "Not available"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Pill size={16} />
            Medicine
          </div>

          <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 whitespace-pre-wrap">
            {prescription.medicine || "Not prescribed"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ClipboardPlus size={16} />
            Instructions
          </div>

          <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 whitespace-pre-wrap">
            {prescription.instructions || "No additional instructions"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionCard;