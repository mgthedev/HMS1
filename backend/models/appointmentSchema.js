import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [3, " Name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"],
    minLength: [10, "Phone Number must contain exactly 10 digits!"],
    maxLength: [10, "Phone Number must contain exactly 10 digits!"],
  },
  appointment_date: {
    type: String,
    required: [true, "Appointment Date is required!"],
  },
  department: {
    type: String,
    required: [true, "Department Name is required!"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
