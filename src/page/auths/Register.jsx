
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { registerUser } from "../../services/authServices";

// function Register() {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const handleChange = (e)=>{
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   const handleSubmit=async (e)=>{
//     e.preventDefault();
//     try {
//       const response = await registerUser(formData);
//       toast.success("User registered successfully");
//       console.log(response);
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
      
//     } catch (error) {
//       toast.error(error.response?.data?.message||"Something went wrong");
      
//     }
//   }



//   return (
//     <div className=" bg-gray-500 rounded-3xl  mx-50  justify-center h-150 w-1/2 ">
//       <h1 className="text-4xl py-8">Register</h1>
//       <div className=" bg-amber-500  justify-center items-center">

//       <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center ">
//         <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         className=" text-xl p-2 my-2 border-2 rounded w-3/4 mx-4 outline-none"
        
//         type="text" placeholder="Name" />
//         <input value={formData.email} onChange={handleChange} className="p-2 text-xl border-2 rounded w-3/4 mx-4 outline-none" name="email" type="email" placeholder="Email" />
//         <input value={formData.password} onChange={handleChange} className="p-2 text-xl border-2 rounded w-3/4 mx-4 outline-none" name="password" type="password" placeholder="Password" />
//         <button className="bg-black text-white p-2 w-40 mx-30 rounded-2xl" type="submit">Register</button>
//       </form>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

import { registerSchema } from "../../features/auth/schema/authSchema.js"
import { registerUser } from "../../services/authServices.js"

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  })

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data)

      toast.success(response.message || "User registered successfully")

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      )
    }
  }

  const onInvalid = (formErrors) => {
    console.log("Register form validation errors:", formErrors)
    toast.error("Please fix the highlighted fields before submitting")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#e2e8f0_45%,_#cbd5e1_100%)] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <div className="border-b border-slate-200/70 px-8 pb-6 pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Join Prescripto
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Set up your profile to book appointments and manage your care in one place.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-5 px-8 py-8"
          noValidate
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              placeholder="Enter your full name"
              autoComplete="name"
              {...register("name")}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
            />

            <p className="mt-1 min-h-5 text-sm text-rose-500">
              {touchedFields.name ? errors.name?.message || "" : ""}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
            />

            <p className="mt-1 min-h-5 text-sm text-rose-500">
              {touchedFields.email ? errors.email?.message || "" : ""}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a secure password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
            />

            <p className="mt-1 min-h-5 text-sm text-rose-500">
              {touchedFields.password ? errors.password?.message || "" : ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register
