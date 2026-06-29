import { registerUser,loginUser,logoutUser } from "../../../api/auth.api";
import { useContext,useState } from "react";
import { AuthContext } from "../../../shared/context/AuthContext";


export const useAuth = () => {
    const { user, setUser, isCheckingAuth } = useContext(AuthContext);
    const [registering, setRegistering] = useState(false);
    const[logging, setLogging] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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

     return{
        user,
        handleLogout,
        isCheckingAuth,
        isLoggingOut,
        
        handleRegister,
        handleLogin,
        registering,
        logging

     }


}
   