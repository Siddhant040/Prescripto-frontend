import { useContext, useState } from "react";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendVerifyEmail,
  resetPassword,
} from "../../../api/auth.api";
import { AuthContext } from "../../../shared/context/AuthContext";

export const useAuth = () => {
  const { user, setUser, isCheckingAuth } = useContext(AuthContext);
  const [registering, setRegistering] = useState(false);
  const [logging, setLogging] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

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
  };
};
