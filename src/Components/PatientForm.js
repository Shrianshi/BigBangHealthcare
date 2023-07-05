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
        name: Name,
        age: Age,
        gender: Gender,
        city:City,
        state:State
      };

      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch("https://localhost:7127/api/Patient", {
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
      console.error("Error adding Patient:", error);
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
        <div className="form-group">
          <input className="form-control" placeholder="Enter name of patient"
            type="text"
            value={Name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Enter age of patient"
            type="text"
            value={Age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Enter gender of patient"
            type="text"
            value={Gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Enter city of patient"
            type="text"
            value={City}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Enter State of patient"
            type="text"
            value={State}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div>
            <button type="submit" className="btn btn-success">Add Patient</button>
        </div>
      </form>
    </div>
  );
};
