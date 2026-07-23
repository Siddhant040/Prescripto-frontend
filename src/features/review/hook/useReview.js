import {createReview,deleteReview,updateReview,getPatientReview,getDoctorReview} from "../../../api/review.api";
import { useState } from "react";
import toast from "react-hot-toast";
export const useReview = () => {
    const[creatingReview, setCreatingReview] = useState(false);
    const [updatingReview, setUpdatingReview] = useState(false);
    const [deletingReview, setDeletingReview] = useState(false);
   const [patientReviews, setPatientReviews] = useState({
  reviews: [],
  total: 0,
  page: 1,
  limit: 10,
});
const [doctorReviews, setDoctorReviews] = useState({
  reviews: [],
  total: 0,
  page: 1,
  limit: 10,
});
    const [listLoading, setListLoading] = useState(false);
    const [doctorListLoading, setDoctorListLoading] = useState(false);

    const handleCreateReview = async (reviewData) => {
        try {
            setCreatingReview(true);
        const response = await createReview(reviewData);
        return response;
        }catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }
         finally {
            setCreatingReview(false);
        }
    };
    const handleUpdateReview= async (id,reviewData)=>{
        setUpdatingReview(true)
        try {
            const response = await updateReview(id,reviewData);
            return response;
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }
        finally {
            setUpdatingReview(false);
        }
    }
    const handleDeleteReview = async (id)=>{
        setDeletingReview(true)
        try {
            const response = await deleteReview(id);
            return response;
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }
        finally {
            setDeletingReview(false);
        }
    }
   const handlePatientReview = async () => {
  setListLoading(true);
  try {
    const response = await getPatientReview();
    const payload = response?.data?.data ?? response?.data ?? {
      reviews: [],
      total: 0,
      page: 1,
      limit: 10,
    };

    setPatientReviews(payload);
    return payload;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.message || "Unable to fetch reviews");
  } finally {
    setListLoading(false);
  }
};
const handleDoctorReview = async () => {
  setDoctorListLoading(true);
  try {
    const response = await getDoctorReview();
    const payload = response?.data?.data ?? response?.data ?? {
      reviews: [],
      total: 0,
      page: 1,
      limit: 10,
    };

    setDoctorReviews(payload);
    return payload;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.message || "Unable to fetch reviews");
  } finally {
    setDoctorListLoading(false);
  }
};

    return {
        handleCreateReview,
        creatingReview
        ,handleUpdateReview,
        updatingReview,
        handleDeleteReview,
        deletingReview,
        handlePatientReview,
        patientReviews,
        listLoading,
        handleDoctorReview,
        doctorReviews,
        doctorListLoading
    }
}