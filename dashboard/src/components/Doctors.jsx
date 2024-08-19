import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://emsback.vercel.app/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="page doctors">
      <h1>Employees</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              <img
                src={element.docAvatar && element.docAvatar.url}
                alt="doctor avatar"
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  DOB: <span>{element.dob.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{element.doctorDepartment}</span>
                </p>
                {/* Removed NIC and Gender */}
              </div>
            </div>
          ))
        ) : (
          <h1>Fetching employee data from cloud please wait</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
