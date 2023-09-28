import React, { useState } from "react";

export const DoctorForm1 = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const doctorData = {
        name: name,
        specialization:specialization,
        status: status
      };

      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch("https://localhost:7127/api/Doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + jwttoken,
        },
        body: JSON.stringify(doctorData),
      });

      if (response.ok) {
        console.log("Doctor added successfully");
        // Optionally, you can trigger a parent component's function to refresh the teacher list
        // Example: props.fetchTeachers();
      } else {
        console.error("Error adding doctor:", response.statusText);
        window.alert("Failed to add doctor");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
    }

    // Reset the form fields
    setName("");
    setSpecialization("");
    setStatus("");
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text" className="form-control" placeholder="Enter doctor name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text" className="form-control" placeholder="Enter doctor specialization"
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text" className="form-control" placeholder="Enter doctor status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Add Doctor</button>
      </form>
    </div>
  );
};
