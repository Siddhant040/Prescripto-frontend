const statusClasses = {
  Upcoming: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completed: "bg-teal-50 text-teal-700 ring-teal-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const RecentAppointmentsTable = ({ appointments }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Recent appointments
          </p>
          <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-slate-950">
            Booking history
          </h2>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          View all
        </button>
      </div>

      <div className="mt-4 hidden overflow-x-auto lg:block">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Date &amp; time</th>
              <th className="pb-3 font-medium">Hospital</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-slate-100 last:border-b-0">
                <td className="h-16 pr-4">
                  <div>
                    <p className="font-semibold text-slate-950">{appointment.doctorName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.specialization}
                    </p>
                  </div>
                </td>
                <td className="h-16 pr-4">
                  <p className="font-medium text-slate-900">{appointment.dateLabel}</p>
                  <p className="mt-1 text-sm text-slate-500">{appointment.timeLabel}</p>
                </td>
                <td className="h-16 pr-4 text-sm text-slate-600">
                  {appointment.hospital}
                </td>
                <td className="h-16 pr-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                      statusClasses[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="h-16 text-right">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-4 lg:hidden">
        {appointments.map((appointment) => (
          <article
            key={appointment.id}
            className="rounded-[1.5rem] border border-slate-100 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{appointment.doctorName}</p>
                <p className="mt-1 text-sm text-slate-500">{appointment.specialization}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  statusClasses[appointment.status]
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>{appointment.dateLabel} at {appointment.timeLabel}</p>
              <p>{appointment.hospital}</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              View details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentAppointmentsTable;
