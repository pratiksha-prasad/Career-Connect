import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
      password: {
        type: String,
        required: [true, "Please provide a Password!\n"],
        minLength: [8, "Password must contain at least 8 characters!\n"],
        maxLength: [32, "Password cannot exceed 32 characters!\n"],
        select: false,
      },
      role: {
        type: String,
        required: [true, "Please select a role\n"],
        enum: ["Job Seeker", "Employer"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
    
    //hashing password
    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    });

    //compare password
    userSchema.methods.comparePassword = async function(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };

    //generating jwt
    userSchema.methods.getJWTToken = function (){
      return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };

    export const User = mongoose.model("User", userSchema);