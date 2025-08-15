import patientModel from '../models/patient.model.js';
import { responseDefault } from '../utils/responseMessage.js';
import { createPatientSchema } from '../validation/validationPatient.js';
import historyModel from '../models/history.model.js';

// Tambah data pasien
export const addPatient = async (req, res) => {
  const io = req.app.get("io");

  try {
    // Validasi menggunakan schema Joi
    const { error } = createPatientSchema(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Simpan data ke collection 'patients'
    const response = await patientModel.create(req.body);

    // Simpan riwayat ke collection 'history'
    await historyModel.create({
      alamat: response.alamat,
      tgl: response.tgl,
      name: response.name,
      keluhan: response.keluhan,
    });

    // Emit socket update
    io.emit("patient-updated", {
      action: "add",
      data: response,
    });

    // Kirim response sukses
    return res.status(201).json({
      success: true,
      message: "Patient added successfully",
      data: response,
    });

  } catch (error) {
    // Tangani error
    return res.status(500).json({
      success: false,
      message: "Failed to add patient",
      error: error.message,
    });
  }
};



// Ambil semua pasien
export const getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find();
        res.status(200).json({
            success: true,
            data: patients,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve patients",
            error: error.message,
        });
    }
};

//get name by id
export const getPatientById = async (req, res) => {
    try {
        const patient = await patientModel.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: responseDefault.ID_NOT_FOUND.message,
            });
        }

        res.status(200).json({
            success: true,
            data: patient,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve patient",
            error: error.message,
        });
    }
};


//get name by ID and update
export const updateData = async (req,res) => {
    const id = req.params.id
    const body = req.body

    try{
const response = await patientModel.findByIdAndUpdate(
  { _id: id },
  { $set: body },
  { new: true }
);

const io = req.app.get("io");
io.emit("patient-updated", {
  action: "update",
  data: response,
});

res.status(200).json({
  message: "update data",
});

    } catch (error){
        console.log(error)
    }
}

//get data by id and delete
export const deleteData = async (req,res) =>{
    try {
       const deleted = await patientModel.findByIdAndDelete(req.params.id);

const io = req.app.get("io");
io.emit("patient-updated", {
  action: "delete",
  data: deleted,
});

res.status(200).json({
  message: "data berhasil dihapus",
});

    } catch (error) {
        console.log(error);
        
    }
}