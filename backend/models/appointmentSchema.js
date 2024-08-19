import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
    minLength: [3, "First Name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
    minLength: [3, "Last Name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"],
    minLength: [11, "Phone Number must contain exactly 11 digits!"],
    maxLength: [11, "Phone Number must contain exactly 11 digits!"],
  },
  appointment_date: {
    type: String,
    required: [true, "Appointment Date is required!"],
  },
  department: {
    type: String,
    required: [true, "Department Name is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
