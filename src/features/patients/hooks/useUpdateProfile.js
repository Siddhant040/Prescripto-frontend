import { useState,useContext } from "react";
import { updateUserProfileApi, uploadAvatarApi, changePassword } from "../../../api/auth.api";
import { AuthContext } from "../../../shared/context/AuthContext";



export const useUpdateProfile = () => {
    const { checkAuth } = useContext(AuthContext);
    const [updating, setUpdating] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

  const updateUserProfile = async (userData) => {
  try {
    setUpdating(true);
    const response = await updateUserProfileApi(userData);

    if (response.success) {
      await checkAuth();
    }

    return response;
  } finally {
    setUpdating(false);
  }
};

const uploadAvatar = async (file) => {
  try {
    setUploadingAvatar(true);

    const response = await uploadAvatarApi(file);

    if (response.success) {
      await checkAuth();
    }

    return response;
  } finally {
    setUploadingAvatar(false);
  }
};

const handleChangePassword = async (userData)=>{
  try{
    setUpdatingPassword(true);
    const response = await changePassword(userData);
    return response;
  }finally{
    setUpdatingPassword(false);
  }
}

return {
   updating,
   updateUserProfile,
   uploadingAvatar, 
   uploadAvatar, 
   updatingPassword, 
   handleChangePassword };

}
 