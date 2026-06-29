import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../../api/auth.api";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {

      try {
        const response = await getCurrentUser();
        console.log(response);
        setUser(response);


      } catch (error) {
        console.log("Full refresh error:", error);
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        setUser(null);
      } finally {
        setIsCheckingAuth(false);

      }


    }

    checkAuth();

  }, []);




  return (
    <AuthContext.Provider value={{ user, setUser, isCheckingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;