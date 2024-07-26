import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title.\n"],
    minLength: [3, "Title must contain at least 3 Characters!\n"],
    maxLength: [30, "Title cannot exceed 30 Characters!\n"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription.\n"],
    minLength: [30, "Description must contain at least 30 Characters!\n"],
    maxLength: [500, "Description cannot exceed 500 Characters!\n"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category.\n"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name.\n"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name.\n"],
  },
  location: {
    type: String,
    required: [true, "Please provide location.\n"],
    minLength: [20, "Location must contian at least 20 characters!\n"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits\n"],
    maxLength: [9, "Salary cannot exceed 9 digits\n"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits\n"],
    maxLength: [9, "Salary cannot exceed 9 digits\n"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits\n"],
    maxLength: [9, "Salary cannot exceed 9 digits\n"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);