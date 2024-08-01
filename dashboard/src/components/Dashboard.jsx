import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [registeredDoctors, setRegisteredDoctors] = useState(0);

  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://hmsback.vercel.app/api/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        setTotalAppointments(data.appointments.length);
      } catch (error) {
        setAppointments([]);
        toast.error("Failed to fetch appointments");
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hmsback.vercel.app/api/v1/user/doctors",
          { withCredentials: true }
        );
        setRegisteredDoctors(data.doctors.length);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    if (isAuthenticated) {
      fetchAppointments();
      fetchDoctors();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://hmsback.vercel.app/api/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status, visited: status === "approved" }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleStatusChange = (e, appointmentId) => {
    const selectedStatus = e.target.value === "visited" ? "approved" : "pending";
    handleUpdateStatus(appointmentId, selectedStatus);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{admin ? `${admin.firstName} ${admin.lastName}` : "Loading..."}</h5>
            </div>
            <p>Welcome to your dashboard. Here you can manage appointments and view statistics.</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{totalAppointments}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{registeredDoctors}</h3>
        </div>
      </div>

      <section className="details">
        <h3>Appointment Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
                <td>
                  <select
                    value={appointment.status === "approved" ? "visited" : "pending"}
                    onChange={(e) => handleStatusChange(e, appointment._id)}
                  >
                    <option value="pending">Pending</option>
                    <option value="visited">Visited</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Dashboard;
