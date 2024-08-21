import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [Department, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "SETTLEMENT AND DISPUTES",
    "ACCOUNTING",
    "IT",
    "HUMAN RESOURCE",
    "LAND TITLES",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("Department", Department);
      formData.append("Avatar", docAvatar);

      await axios.post("https://emsback.vercel.app/api/v1/user/doctor/addnew", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        toast.success(res.data.message);
        navigateTo("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDob("");
        setGender("");
        setPassword("");
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <h1 className="form-title">REGISTER A NEW Employee</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div className="avatar">
              <img
                src={docAvatarPreview ? `${docAvatarPreview}` : "/el.png"}
                alt="Photo"
                className="avatar-img"
              />
              <label htmlFor="avatar" className="avatar-label">
                Upload Picture
              </label>
              <input
                type="file"
                id="avatar"
                onChange={handleAvatar}
                className="avatar-input"
              />
            </div>
            <div className="inputs">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
              {/* Removed NIC Field */}
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input-field"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input-field"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <select
                value={Department}
                onChange={(e) => setDoctorDepartment(e.target.value)}
                className="input-field"
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                ))}
              </select>
              <button type="submit" className="submit-btn">
                Register New Employee
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
