import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!\n"],
    minLength: [3, "Name must contain at least 3 Characters!\n"],
    maxLength: [30, "Name cannot exceed 30 Characters!\n"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!\n"],
    validate: [validator.isEmail, "Please provide a valid Email!\n"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!\n"],
  },
  phone: {
    type: String,  
    required: [true, "Please enter your Phone Number!\n"],
    validate: {
      validator: function(v) {
        return v.length === 10 && /^\d+$/.test(v); 
      },
      message: "Phone Number must be of 10 digits!\n"
    },
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!\n"],
  },
  resume: {
    public_id: {
      type: String, 
      required: true,
    },
    url: {
      type: String, 
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);