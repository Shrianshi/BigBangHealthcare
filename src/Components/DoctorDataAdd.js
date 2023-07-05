import React, { useState } from "react";

export const DoctorForm = () => {
  const [Name, setName] = useState("");
  const [Status, setStatus] = useState("");
  const [Specialization, setSpecialization] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const doctorData = {
        name: Name,
        specialization:Specialization,
        status: "Inactive",
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
        console.error("Error adding Doctor:", response.statusText);
        window.alert("Failed to add Doctor");
      }
    } catch (error) {
      console.error("Error adding Doctor:", error);
    }

    // Reset the form fields
    setName("");
    setStatus("");
    setSpecialization("");
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={Name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Specialization</label>
          <input
            type="text"
            value={Specialization}
            onChange={(event) => setSpecialization(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add Doctor</button>
        </div>
      </form>
    </div>
  );
};
