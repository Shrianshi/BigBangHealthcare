import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { PatientById } from "./PatientById";
import { DoctorForm } from "./DoctorDataAdd";


export const DoctorView = () => {
  const [Doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch("https://localhost:7127/api/Doctor", {
        headers: {
          Authorization: "bearer " + jwttoken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error("Error fetching doctors:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Update
  const updateDoctor = async (Id, updatedData) => {
    try {
      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch(
        `https://localhost:7127/api/Doctor/${Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwttoken,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Doctor updated successfully");
        fetchDoctor();
      } else {
        console.error("Error updating doctor:", response.statusText);
        window.alert("Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  // Delete
  const deleteDoctor = async (Id) => {
    try {
      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch(
        `https://localhost:7127/api/Doctor/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + jwttoken,
          },
        }
      );

      if (response.ok) {
        console.log("Doctor deleted successfully");
        fetchDoctor();
      } else {
        console.error("Error deleting doctor:", response.statusText);
        window.alert("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // Add New

  return (
    <div>
      <Nav/>
      <h1>Doctor List</h1>
      <button
        className="btn btn-primary"
        style={{ float: "right" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New
      </button>
      <div
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
                Add Doctor
              </h1>
              <DoctorForm></DoctorForm>
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
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Name</td>
            <td>Specialization</td>
            <td>Status</td>
            <td>Delete</td>
            <td>Action</td>
          </tr>
          {Doctor.map((Doctor) => (
            <tr key={Doctor.Id}>
              <td>{Doctor.Name}</td>
              <td>{Doctor.Specialization}</td>
              <td>{Doctor.Status}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteDoctor(Doctor.Id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-${
                    Doctor.Status === "Active" ? "success" : "warning"
                  }`}
                  onClick={() =>
                    updateDoctor(Doctor.Id, {
                      ...Doctor,
                      Name: Doctor.Name,
                      Specialization: Doctor.Specialization,
                      Status:
                      Doctor.Status === "Active" ? "Inactive" : "Active",
                    })
                  }
                >
                  {Doctor.Status}
                </button>
              </td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
