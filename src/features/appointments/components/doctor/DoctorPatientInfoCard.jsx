import DetailInfoGrid from "../details/DetailInfoGrid";
import { getDoctorPatientInfoRows, getInitials } from "./doctorAppointmentUiData";

const DoctorPatientInfoCard = ({ appointment }) => {
  const patient = appointment.patient || {};

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Patient information
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
          {getInitials(patient.name)}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold tracking-tight text-slate-950">
            {patient.name || "Patient"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {patient.email || "Email not available"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <DetailInfoGrid title="Patient details" rows={getDoctorPatientInfoRows(appointment)} />
      </div>
    </section>
  );
};

export default DoctorPatientInfoCard;
