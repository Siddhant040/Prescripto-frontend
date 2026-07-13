import { useState } from "react";
import CreateDoctorHero from "../components/createProfile/CreateDoctorHero";

import CreateDoctorProfileForm from "../components/createProfile/CreateDoctorProfileForm";

function CreateDoctorProfile() {
  


  return (
    <div className="w-full px-1 pb-1">
      <div className="space-y-5">
        <CreateDoctorHero />

        <div className=" flex justify-center items-center w-300">
          <CreateDoctorProfileForm />
        </div>
      </div>
    </div>
  );
}

export default CreateDoctorProfile;
