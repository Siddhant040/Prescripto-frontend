import { z } from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
})

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
})
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  })
  export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: "Please select a valid gender",
    }),
  }),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),
});
export const changePasswordSchema = z.object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters"),
     

    confirmPassword: z
      .string()
      .min(1, "Confirm your new password"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );
  export const avatarSchema = z.object({
  avatar: z
    .instanceof(File, {
      message: "Please select an image",
    })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size must be less than 2MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG and WEBP images are allowed"
    ),
});
