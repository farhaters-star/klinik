// routes/historyRoutes.js (atau dimanapun kamu menaruh routing)
import express from "express";
import historyModel from "../models/history.model.js";
const router = express.Router();

router.get("/history", async (req, res) => {
  try {
    const data = await historyModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Data riwayat berhasil diambil",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
