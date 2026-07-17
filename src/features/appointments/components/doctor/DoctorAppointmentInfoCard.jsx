import DetailInfoGrid from "../details/DetailInfoGrid";
import { getDoctorAppointmentInfoRows } from "./doctorAppointmentUiData";

const DoctorAppointmentInfoCard = ({ appointment }) => {
  return (
    <DetailInfoGrid
      title="Appointment"
      rows={getDoctorAppointmentInfoRows(appointment)}
    />
  );
};

export default DoctorAppointmentInfoCard;
