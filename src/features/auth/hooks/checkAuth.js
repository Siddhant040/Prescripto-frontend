import { useContext, useState } from "react";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendVerifyEmail,
  resetPassword,
  changeActiveRole,
  updateUserProfileApi,
   uploadAvatarApi,
   changePassword
} from "../../../api/auth.api";
import { AuthContext } from "../../../shared/context/AuthContext";

export const useAuth = () => {
  const { user, setUser, isCheckingAuth, checkAuth } = useContext(AuthContext);
  const [registering, setRegistering] = useState(false);
  const [logging, setLogging] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isChangingActiveRole, setIsChangingActiveRole] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleRegister = async (userData) => {
    try {
      setRegistering(true);
      return await registerUser(userData);
    } finally {
      setRegistering(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      setLogging(true);
      const response = await loginUser(userData);
      setUser(response.data?.user || response.data || null);
      return response;
    } finally {
      setLogging(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      setUser(null);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleResendVerifyEmail = async (email) => {
    try {
      setIsResending(true);
      return await resendVerifyEmail(email);
    } finally {
      setIsResending(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      setIsForgotPassword(true);
      return await forgotPassword(email);
    } finally {
      setIsForgotPassword(false);
    }
  };

  const handleResetPassword = async (token, password) => {
    try {
      setIsResettingPassword(true);
      return await resetPassword(token, password);
    } finally {
      setIsResettingPassword(false);
    }
  };
  const handleChangeActiveRole = async (activeRole) => {
    try {
      setIsChangingActiveRole(true);
      const response = await changeActiveRole(activeRole);
      setUser(response.data?.user || response.data || null)
      return response
    } finally {
      setIsChangingActiveRole(false);
    }
  };
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

  const handleChangePassword = async (userData) => {
    try {
      setUpdatingPassword(true);
      const response = await changePassword(userData);
      return response;
    } finally {
      setUpdatingPassword(false);
    }
  }


  return {
    user,
    handleLogout,
    isCheckingAuth,
    isLoggingOut,
    isResending,
    handleResendVerifyEmail,
    handleRegister,
    handleLogin,
    registering,
    logging,
    handleForgotPassword,
    isForgotPassword,
    isResettingPassword,
    handleResetPassword,
    isChangingActiveRole,
    handleChangeActiveRole,
    updating,
    updateUserProfile,
    uploadingAvatar,
    uploadAvatar,
    updatingPassword,
    handleChangePassword
  
};
};
