import { useState } from "react";
import { Star } from "lucide-react";
import { useReview } from "../hook/useReview";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const MAX_LENGTH = 500;

export const ReviewSection = ({ review, onRefresh }) => {
  const { id: appointmentId } = useParams();

  const {
    handleCreateReview,
    handleUpdateReview,
    handleDeleteReview,
    deletingReview,
  } = useReview();

  const isEditMode = review != null;

  const [rating, setRating] = useState(review?.rating ?? 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(review?.review ?? "");

  const createReview = async () => {
    try {
      const response = await handleCreateReview({
        appointmentId,
        rating,
        review: comment,
      });

      await onRefresh();

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create review"
      );
    }
  };

  const updateReview = async () => {
    try {
      const response = await handleUpdateReview(review.id, {
        rating,
        review: comment,
      });

      await onRefresh();

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update review"
      );
    }
  };

  const deleteReview = async () => {
    try {
      const response = await handleDeleteReview(review.id);

      await onRefresh();

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete review"
      );
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Star className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Leave a Review
        </h2>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        Share your experience with this consultation. Your feedback helps
        other patients.
      </p>

      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-gray-700">
          Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={30}
                className={
                  value <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Comment
        </label>

        <textarea
          rows={5}
          maxLength={MAX_LENGTH}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience with the doctor..."
          className="w-full resize-none rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="mt-2 text-right text-xs text-gray-500">
          {comment.length} / {MAX_LENGTH}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        {isEditMode && (
          <button
            type="button"
            onClick={deleteReview}
            disabled={deletingReview}
            className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            {deletingReview ? "Deleting..." : "Delete Review"}
          </button>
        )}

        <button
          type="button"
          onClick={isEditMode ? updateReview : createReview}
          className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {isEditMode ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};