import { 
    getAllDoctors,
     getDoctorbyId,
      getReviewsbyId,
      getLoginDoctor, 
       updateDoctorProfile ,
       updateDoctorAvailability,
       deleteDoctor, 
       createDoctor,
      updateSlots} from "../../../api/doctor.api";
import { useState } from "react";

import toast from "react-hot-toast";
export const useDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(false);
    const[selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDoctorLoading, setSelectedDoctorLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loggedInDoctor, setLoggedInDoctor] = useState(null); 
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [updatingAvailability, setUpdatingAvailability] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [creatingDoctor, setCreatingDoctor] = useState(false);
    const [updatingSlots, setUpdatingSlots] = useState(false);


const handleGetAllDoctors = async () => {
    try {
        setDoctorLoading(true);
        const response = await getAllDoctors();
        
        const doctors = response.data?.doctors ?? [];
        setDoctors(doctors);
        
        return doctors;
    } catch (error) {
        console.log(error);
        toast.error("Unable to fetch doctors");
    }
    finally {
        setDoctorLoading(false);
    }
}

const handleGetDoctorById = async (id) => {
    try {
        setSelectedDoctorLoading(true);
        const response = await getDoctorbyId(id);
        
        const doctor = response.data;
        setSelectedDoctor(doctor);
        // console.log(doctor);
        return doctor;
    } catch (error) {
        console.log(error);
        toast.error("Unable to fetch doctor");
    }
    finally {
        setSelectedDoctorLoading(false);
    }
}

const handleGetReviewsbyId = async (id) => {
    try{
        const response = await getReviewsbyId(id);
        console.log("response",response);
        console.log("response.data",response.data);
        const reviewsList = response.data.reviews;
        console.log("reviewsList",reviewsList);
        setReviews(reviewsList);
        return reviewsList;
    }
    catch (error) {
        console.log(error);
        setReviews([])
        toast.error("Unable to fetch reviews");
    }
}
const handleGetloggedInDoctor = async () => {
    try {
        const response = await getLoginDoctor();
        
        const doctor = response.data;
        console.log("response",doctor);
      

        setLoggedInDoctor(doctor);
        // console.log(doctor);
        return doctor;
    
    }catch (error) {
        console.log(error);
        toast.error("Unable to fetch doctor");
    }
    finally {
        setSelectedDoctorLoading(false);
    }
}

const handleUpdateDoctorProfile = async (data) => {
  try {
    setUpdatingProfile(true);

    const response = await updateDoctorProfile(data);

    if (response.success) {
      await handleGetloggedInDoctor();
    }

    return response;
  } catch (error) {
    toast.error("Unable to update doctor profile");
  } finally {
    setUpdatingProfile(false);
  }
};
const handletoggleAvailability = async (data) => {
  try {
    setUpdatingAvailability(true);

    const response = await updateDoctorAvailability(data);

    if (response.success) {
      await handleGetloggedInDoctor();
    }

    return response;
  } catch (error) {
    toast.error("Unable to update doctor availability");
  } finally {
    setUpdatingAvailability(false);
    }
}
const handleDeleteDoctor = async () => {
  try {
    setDeleting(true);

    const response = await deleteDoctor();

    return response;
  } catch (error) {
    console.log(error);
    toast.error("Unable to delete doctor");
    throw error;
  }finally {
    setDeleting(false);
  }
};

const handleCreateDoctor = async (data) => {
    try {
      setCreatingDoctor(true);
  
      const response = await createDoctor(data);
  
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Unable to create doctor");
      throw error;
    }finally {
      setCreatingDoctor(false);
    }
  };

const handleUpdateSlots = async (data) => {
    try {
      setUpdatingSlots(true);
  
      const response = await updateSlots(data);
  
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Unable to update slots");
      throw error;
    }finally {
      setUpdatingSlots(false);
    }
  
}  





    return {
        doctors,
        doctorLoading,
        handleGetAllDoctors,
        handleGetDoctorById,
        selectedDoctor,
        selectedDoctorLoading,
        handleGetReviewsbyId,
        reviews,
        handleGetloggedInDoctor,
        loggedInDoctor,
        handleUpdateDoctorProfile,
        updatingProfile,
        handletoggleAvailability,
        updatingAvailability,
        handleDeleteDoctor,
        deleting,
        handleCreateDoctor,
        creatingDoctor,
        handleUpdateSlots,
        updatingSlots

         
    };
};
