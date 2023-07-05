import React, { useEffect, useState } from "react";
import NavDoc from "./NavDoc";
import { PatientById } from "./PatientById";
import { PatientForm } from "./PatientForm";
import Footer from "./Footer";

const PatData = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      let jwttoken = sessionStorage.getItem('jwttoken');
      const response = await fetch("https://localhost:7127/api/Patient",
      {
        headers: {
          'Authorization': 'bearer ' + jwttoken
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        console.error("Error fetching patients:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);   
    }
  };

  // Delete
  const deletePatient = async (Id) => {
    try {
      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch(
        `https://localhost:7127/api/Patient/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + jwttoken,
          },
        }
      );

      if (response.ok) {
        console.log("patient deleted successfully");
        fetchPatients();
      } else {
        console.error("Error deleting patient:", response.statusText);
        window.alert("Failed to delete patient");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };


  return (
    <div>
    <NavDoc></NavDoc>
    
      <h2>Patients List</h2>

      {/* <button
        className="btn btn-primary"
        style={{ float: "right" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New
      </button> */}
      {/* <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Patient
              </h1>
              <PatientForm></PatientForm>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Gender</td>
            
          </tr>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
      <Footer></Footer>
    </div>
  );
};

export default PatData;
