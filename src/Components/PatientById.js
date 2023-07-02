import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";

export const PatientById = () => {
  const [patients, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      let jwttoken = sessionStorage.getItem("jwttoken");
      const response = await fetch(
        `https://localhost:7127/api/Patient/`,
        {
          headers: {
            Authorization: "bearer " + jwttoken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Error fetching patients:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredPatient = patients.filter((patients) => {
    const { Name, Age, Gender } = filters;
    return (
      patients.name.toLowerCase().includes(Name.toLowerCase()) &&
      patients.age.toString().includes(Age) &&
      patients.gender.toLowerCase().includes(Gender.toLowerCase())
    );
  });

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          value={filters.Name}
          onChange={handleFilterChange}
          placeholder="Search by name"
        />
        <input
          type="text"
          name="age"
          value={filters.Age}
          onChange={handleFilterChange}
          placeholder="Search by age"
        />
        <input
          type="text"
          name="gender"
          value={filters.Gender}
          onChange={handleFilterChange}
          placeholder="Search by gender"
        />
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatient.map((patients) => (
            <tr key={patients.id}>
              <td>{patients.nameame}</td>
              <td>{patients.age}</td>
              <td>{patients.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PatientById;