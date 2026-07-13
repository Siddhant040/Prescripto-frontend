export const getInitials = (name) => {
  if (!name) return "GU";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

export const formatDate = (value) => {
  if (!value) return "Not added";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not added";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatStatus = (value) => {
  if (value === true) return "Active";
  if (value === false) return "Inactive";
  return "Unknown";
};

export const getProfileFromUser = (user, fallbackRole = "patient") => ({
  name: user?.name || "Guest",
  email: user?.email || "Not added",
  role: user?.activeRole || user?.role || fallbackRole,
  avatar: user?.avatar || "",
  phone: user?.phone || "",
  gender: user?.gender || "",
  dateOfBirth: user?.dateOfBirth || null,
  address: user?.address || "",
  isEmailVerified: user?.isEmailVerified,
  isActive: user?.isActive,
  createdAt: user?.createdAt,
  updatedAt: user?.updatedAt,
});
