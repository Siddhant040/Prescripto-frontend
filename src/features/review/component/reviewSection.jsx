import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import {useReview} from "../hook/useReview"
import {useParams} from "react-router-dom"
import toast from "react-hot-toast";
import {useAppointments} from "../../appointments/hooks/useAppointment"


const MAX_LENGTH = 500;

export const ReviewSection = ({ review,onRefresh }) => {
    
    const { id: appointmentId } = useParams();
    const { handleCreateReview,
        creatingReview,
        handleUpdateReview,
        updatingReview,
        handleDeleteReview,
        deletingReview} = useReview();
      
   const isEditMode = review != null;
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    useEffect(() => {
        if (review) {
            setRating(review?.rating)
            setComment(review?.review)
        }
    }, [review])

    const CreateReview = async() => {
       try {
       const response = await handleCreateReview({
            appointmentId,
            rating,
            review: comment
            
        })
        await onRefresh();
        toast.success(response.message);
       
       } catch (error) {
        console.log(error);
        toast.error(error.response.message);
       }
    };
   const UpdateReview = async () => {
    try {
        const response = await handleUpdateReview(review.id, {
            rating,
            review: comment,
        });

        await onRefresh();

        toast.success(response.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Unable to update review");
    }
};

   const DeleteReview = async () => {
    try {
        const response = await handleDeleteReview(review.id);

        await onRefresh();

        toast.success(response.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Unable to delete review");
    }
};
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                <MessageSquare className="w-5 h-5 text-emerald-900" />
                    Leave a Review
                </h2>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                Share your experience with this consultation. Your feedback helps other
                patients.
            </p>

            {/* Rating */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
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
                                className={`${value <= (hoveredRating || rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                </label>

                <textarea
                    rows={5}
                    maxLength={MAX_LENGTH}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience with the doctor..."
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <p className="mt-2 text-right text-xs text-gray-500">
                    {comment.length} / {MAX_LENGTH}
                </p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
                <div className="flex justify-end gap-3">
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={DeleteReview}
                            disabled={deletingReview}
                            className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                            {deletingReview ? "Deleting..." : "Delete Review"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={isEditMode ? UpdateReview : CreateReview}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        {isEditMode ? "Update Review" : "Submit Review"}
                    </button>
                </div>
            </div>
        </div>
    );
};

