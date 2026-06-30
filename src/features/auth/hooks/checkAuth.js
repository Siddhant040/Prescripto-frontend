import { registerUser,loginUser,logoutUser,resendVerifyEmail,forgotPassword,resetPassword } from "../../../api/auth.api";
import { useContext,useState } from "react";
import { AuthContext } from "../../../shared/context/AuthContext";


export const useAuth = () => {
    const { user, setUser, isCheckingAuth } = useContext(AuthContext);
    const [registering, setRegistering] = useState(false);
    const[logging, setLogging] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

     const handleRegister = async (userData) => {

       try {
        setRegistering(true);
         const response = await registerUser(userData);
         
      
         return response;
       } finally {
        setRegistering(false);
       }
     }

     const handleLogin = async (userData) => {

      try {
        setLogging(true);
         const response = await loginUser(userData);
         
         setUser(response);
         return response;
       } finally {
        setLogging(false);
       }
     }

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
       const response = await resendVerifyEmail(email);
       return response;
      } finally {
        setIsResending(false);
      }
    }  
    const handleForgotPassword = async (email) => {
      try {
        setIsForgotPassword(true);
       const response = await forgotPassword(email);
       return response;
      } finally {
        setIsForgotPassword(false);
      }
    }

    const handleResetPassword = async (token,password) => {
      try {
        setIsResettingPassword(true);
       const response = await resetPassword(token,password);
       return response;
      } finally {
        setIsResettingPassword(false);
      }
    }


     return{
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

     }


}
   