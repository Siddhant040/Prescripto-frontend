import { ChevronLeft, ChevronRight } from "lucide-react";
import DoctorReviewCard from "../component/doctorReviewCard";
import {fallbackDoctorReviews}from"../component/fallbackData"
const reviews = fallbackDoctorReviews
import { useReview } from "../hook/useReview";
import { useEffect } from "react";

const DoctorReviews = ({
//   reviews,
//   total,
//   page,
//   totalPages,
//   onPageChange,
}) => {
    
    
    const {handleDoctorReview,
        doctorReviews,
        doctorListLoading
      } = useReview();
      useEffect(() => {
        handleDoctorReview();
      }, []);
      const reviews = doctorReviews?.reviews ?? [];
      const total = doctorReviews?.total ?? 0;
      const page = doctorReviews?.page ?? 1;
      const totalPages = Math.max(1, Math.ceil(total / (doctorReviews?.limit ?? 10)));
  return (
    <section className="flex h-[700px] flex-col rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">

      <div className="flex items-end justify-between">

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Patient Feedback
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
            Reviews Received
          </h2>
        </div>

        <p className="text-sm font-medium text-slate-500">
          {total} Reviews
        </p>

      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">

        {reviews.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-500">
            No patient reviews yet.
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <DoctorReviewCard
                key={review.id}
                review={review}
              />
            ))}
          </div>
        )}

      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-100 pt-4">

        <p className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-emerald-600 px-3 text-sm font-semibold text-white">
            {page}
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>

      </div>

    </section>
  );
};

export default DoctorReviews;