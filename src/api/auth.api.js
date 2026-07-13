import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
export const getCurrentUser = async ()=>{
  const response = await api.get("/auth/me");
  return response.data;
}

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const  refreshAccessToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

export const resendVerifyEmail = async (email) => {
  const response = await api.post("/auth/resend-email-verification", {email}  );
  
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {email}  );
  
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post(`/auth/reset-password/${token}`, { newPassword}  );
  
  return response.data;
};

export const updateUserProfileApi = async (userData) => {
  const response = await api.patch(
    "/auth/me",
    userData
  );

  return response.data;
};
export const uploadAvatarApi = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.post(
    "/auth/upload-avatar",
    formData
  );

  return response.data;
};
export const changePassword = async (userData) => {
  const response = await api.post(
    "/auth/change-password",
    userData
  );

  return response.data;
}

export const changeActiveRole = async (activeRole) => {
  const response = await api.patch(
    "/auth/active-role",
    {activeRole}
  );  
  return response.data;
}