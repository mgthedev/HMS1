import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";

// Create a new appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {  name, email, phone, appointment_date, department } = req.body;

  const appointment = await Appointment.create({
    name,
    email,
    phone,
    appointment_date,
    department,
    status: "pending",
  });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Sent!",
  });
});

// Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find().populate('name');;
  res.status(200).json({
    success: true,
    appointments,
  });
});

// Update appointment status
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  if (status === "visited") {
    appointment.status = "approved";
  } else if (status === "pending") {
    appointment.status = "pending";
  } else {
    return next(new ErrorHandler("Invalid status!", 400));
  }

  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment Status Updated!",
    appointment,
  });
});

// Delete an appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
