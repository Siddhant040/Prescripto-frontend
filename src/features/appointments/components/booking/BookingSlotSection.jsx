import BookingDateSelector from "./BookingDateSelector";


const BookingSlotSection = ({
  bookingDates,
  slotGroups,
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
}) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Available slots
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
          Choose a convenient time
        </h2>
      </div>

      <div className="mt-5">
        <BookingDateSelector
          dates={bookingDates}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      </div>

      <div className="mt-6 max-h-[360px] overflow-y-auto pr-1">
        {slotGroups.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500">
              No slots available for the selected date.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {slotGroups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold text-slate-950">
                  {group.title}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {group.slots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => onSelectSlot(slot.value)}
                      className={`inline-flex h-10 min-w-24 items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 transition ${selectedSlot === slot.value
                          ? "bg-emerald-600 text-white ring-emerald-600"
                          : "bg-white text-slate-700 ring-emerald-100 hover:bg-emerald-50"
                        }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSlotSection;
