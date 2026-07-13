import DoctorCard from "./DoctorCard";


const DoctorsGrid = ({
  doctors,
  basePath = "/doctors",
}) => {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor._id}
          doctor={doctor}
          basePath={basePath}
        />
      ))}
    </section>
  );
};

export default DoctorsGrid;
