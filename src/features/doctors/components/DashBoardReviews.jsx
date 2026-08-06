import { Star, UserRound } from "lucide-react";
const Panel = ({
    title,
    children,
    className = "",
}) => (
    <section
        className={`rounded-[20px] border border-emerald-100/70 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)] ${className}`}
    >
        {title && (
            <div className="border-b border-emerald-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-950">
                    {title}
                </h2>
            </div>
        )}

        {children}
    </section>
);
const ReviewStars = ({ rating }) => (
    <div className="mt-2 flex text-amber-500">
        {Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating ? "fill-current" : "text-slate-200"
                    }`}
            />
        ))}
    </div>
);

const EmptyReviews = () => (
    <div className="flex h-[calc(520px-4rem)] flex-col items-center justify-center p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <UserRound className="h-6 w-6" />
        </span>
        <p className="mt-4 text-base font-semibold text-slate-950">No reviews yet.</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Patient feedback will appear here after completed appointments.
        </p>
    </div>
);

function DashBoardReviews({ reviewList }) {
  return (
    <Panel title="Patient Reviews" className="overflow-hidden">
      {reviewList.length === 0 ? (
        <EmptyReviews />
      ) : (
        <div className="flex gap-4 overflow-x-auto p-6 scrollbar-hide">
          {reviewList.map((review) => (
            <article
              key={review._id}
              className="min-w-[340px] max-w-[340px] shrink-0 rounded-3xl bg-slate-50/80 p-4 ring-1 ring-slate-100 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-700 to-teal-400 text-sm font-semibold text-white">
                  {review.patient?.avatar ? (
                    <img
                      src={review.patient.avatar}
                      alt={review.patient.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    review.patient.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {review.patient.name}
                    </p>

                    <span className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <ReviewStars rating={review.rating} />

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {review.review}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
}

export default DashBoardReviews;

