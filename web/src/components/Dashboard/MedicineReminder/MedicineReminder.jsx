import "./MedicineReminder.css";

import MedicationIcon from "@mui/icons-material/Medication";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function MedicineReminder() {
  const medicines = [
    {
      name: "Vitamin D",
      time: "08:00 AM",
      taken: true,
    },
    {
      name: "Paracetamol",
      time: "02:00 PM",
      taken: false,
    },
    {
      name: "Calcium",
      time: "08:00 PM",
      taken: false,
    },
  ];

  return (
    <div className="medicine-card">

      <div className="medicine-header">
        <h2>💊 Medicine Reminder</h2>
        <MedicationIcon />
      </div>

      {medicines.map((medicine, index) => (

        <div className="medicine-item" key={index}>

          <div>

            <h4>{medicine.name}</h4>

            <p>
              <AccessTimeIcon fontSize="small" />
              {medicine.time}
            </p>

          </div>

          {medicine.taken ? (
            <CheckCircleIcon className="taken" />
          ) : (
            <button>Take</button>
          )}

        </div>

      ))}

    </div>
  );
}

export default MedicineReminder;