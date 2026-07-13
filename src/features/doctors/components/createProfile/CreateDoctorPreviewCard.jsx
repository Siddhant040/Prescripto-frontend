import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  IndianRupee,
  MapPin,
  Stethoscope,
} from "lucide-react";

const CreateDoctorPreviewCard = ({ values }) => {
  const qualifications =
    values.qualifications
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ") || "MBBS, MD";

  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Live preview
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
          Doctor profile summary
        </h2>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-lg font-semibold text-white">
            DR
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-slate-950">
              Doctor Profile
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              {values.specialization || "Specialization"}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <PreviewRow
            icon={Briefcase}
            label="Experience"
            value={
              values.experience ? `${values.experience} Years` : "Not added"
            }
          />
          <PreviewRow
            icon={IndianRupee}
            label="Consultation Fee"
            value={
              values.consultationFee
                ? `Rs. ${values.consultationFee}`
                : "Not added"
            }
          />
          <PreviewRow
            icon={GraduationCap}
            label="Qualifications"
            value={qualifications}
          />
          <PreviewRow
            icon={MapPin}
            label="Clinic Address"
            value={values.clinicAddress || "Not added"}
          />
          <PreviewRow
            icon={BadgeCheck}
            label="Status"
            value="Pending verification"
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Stethoscope className="h-4 w-4" />
          </span>
          <p className="text-sm leading-6 text-slate-600">
            Availability and verification can be managed after the doctor
            profile is created.
          </p>
        </div>
      </div>
    </section>
  );
};

const PreviewRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white bg-white p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default CreateDoctorPreviewCard;
