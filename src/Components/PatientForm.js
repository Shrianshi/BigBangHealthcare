import React, { useState } from "react";

export const PatientForm = () => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const studentData = {
        Name: Name,
        Age: Age,
        Gender: Gender,
        City:City,
        State:State
      };

      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch("https://localhost:7127/api/Patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + jwttoken,
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        console.log("Patient added successfully");
      } else {
        console.error("Error adding Patient:", response.statusText);
        window.alert("Failed to add Patient");
      }
    } catch (error) {
      console.error("Error adding Doctor:", error);
    }

    // Reset the form fields
    setName("");
    setAge("");
    setGender("");
    setCity("");
    setState("");
  };

  return (
    <div>
      <h2>Add Patient</h2>
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
          <label>Age:</label>
          <input
            type="text"
            value={Age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            value={Gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={City}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={State}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div>
            <button type="submit">Add Patient</button>
        </div>
      </form>
    </div>
  );
};
