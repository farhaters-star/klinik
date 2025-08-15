import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  name    : { type: String, required: true },
  alamat : { type: String, required: true },
  tgl : { type: String, required: true },
  keluhan : { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("History", historySchema);
