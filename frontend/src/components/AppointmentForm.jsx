import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Land Titles");
  const [appointmentDate, setAppointmentDate] = useState("");

  const departmentsArray = [
    "Land Titles",
    "Land Settlements and Disputes",
    "Human Resource",
    "IT",
  ];

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://emsback.vercel.app/api/appointment/post",
        {
          name,
          email,
          phone,
          department,
          appointment_date: appointmentDate,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("Land Titles");
      setAppointmentDate("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create appointment");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            placeholder="Appointment Date"
          />
        </div>
        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
