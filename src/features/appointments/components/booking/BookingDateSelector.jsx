const BookingDateSelector = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-950">Select Date</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {dates.map((date) => (
          <button
            key={date.value}
            type="button"
            onClick={() => onSelectDate(date.value)}
            className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 transition ${
              selectedDate === date.value
                ? "bg-emerald-600 text-white ring-emerald-600"
                : "bg-white text-slate-700 ring-emerald-100 hover:bg-emerald-50"
            }`}
          >
            {date.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingDateSelector;
