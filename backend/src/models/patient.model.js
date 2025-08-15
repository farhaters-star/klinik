import mongoose from "mongoose";

export const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tgl: {
    type: String,
    required: true,
  },
  alamat:{
    type: String,
    required: true, 
  },
  keluhan: {
    type: String,
    required: true, 
  },
  gender:{
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  }
});
 const patientModel = mongoose.model("Patient", patientSchema);

export default patientModel;