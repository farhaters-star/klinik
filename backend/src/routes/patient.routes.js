import express from 'express';
import { Router } from 'express';
import { addPatient,getAllPatients,getPatientById,deleteData, updateData, } from '../controllers/patient.controller.js';

const route = Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post('/addPatient', addPatient);
route.get('/getAllPatient', getAllPatients);
route.get('/getData/:id', getPatientById);
route.put('/editData/:id', updateData);
route.delete('/deleteData/:id', deleteData);

export default route;
