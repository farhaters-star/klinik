import Joi from 'joi';

export const createPatientSchema = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        tgl: Joi.alternatives().try(Joi.date(), Joi.string().isoDate()).required(),
        alamat: Joi.string().max(255).required(),
        gender: Joi.string().valid('laki-laki', 'perempuan').required(),
        keluhan: Joi.string().max(255).required(),
        timeStamp: Joi.date().default(Date.now) 
    })
    return schema.validate(data);
}