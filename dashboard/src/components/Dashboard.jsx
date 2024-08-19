import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://hmsback.vercel.app/api/appointment/getall"
        );
        setAppointments(data.appointments);
        setTotalAppointments(data.appointments.length);
      } catch (error) {
        setAppointments([]);
        toast.error("Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/el.png" alt="dems" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>Welcome!</h5>
            </div>
            <p>
              Welcome to your dashboard. Here you can manage appointments and view statistics.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{totalAppointments}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td>{appointment.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
