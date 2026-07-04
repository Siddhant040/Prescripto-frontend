import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../api/auth.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data?.user || response.data || null);
      } catch (error) {
        console.log("Auth check failed:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    useEffect(() => {

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isCheckingAuth,checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
