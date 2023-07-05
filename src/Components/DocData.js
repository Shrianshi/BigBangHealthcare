import React, { useEffect, useState } from "react";
import NavPat from "./NavPat";
import { PatientById } from "./PatientById";
import { DoctorForm } from "./DoctorDataAdd";
import { DoctorForm1 } from "./DoctorForm";
import Footer from "./Footer";


const DocData= () => {
    const [Doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
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
    const updateDoctors = async (Id, updatedData) => {
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
                fetchDoctors();
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
                fetchDoctors();
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
            <NavPat />
            <h2>Doctor List</h2>

            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Specialization</td>
                        <td>Status</td>
                    </tr>
                    {Doctors.map((Doctor) => (
                        <tr key={Doctor.id}>
                            <td>{Doctor.name}</td>
                            <td>{Doctor.specialization}</td>
                            <td>
                                <button
                                    className={`btn btn-${Doctor.status === true ? "success" : "warning"
                                        }`}>
                                    {Doctor.status}
                                </button>
                            </td>
                        </tr>
                    ))}
                </thead>
                <tbody></tbody>
            </table>
            <Footer></Footer>
        </div>
    );
};

export default DocData;
