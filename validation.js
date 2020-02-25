
const Joi = require('@hapi/joi');
//Register Validation
const registerValidationWithEmail = (data) =>{
    const schema = Joi.object({
        first_name : Joi.string().min(2).required(),
        last_name : Joi.string().min(2).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });
    return schema.validate(data)
};
const registerValidationWithMob = (data) =>{
    const schema = Joi.object({
        first_name : Joi.string().min(2).required(),
        last_name : Joi.string().min(2).required(),
        mobile_no : Joi.string().min(10).required(),
        password : Joi.string().min(6).required()
    });
    return schema.validate(data)
};

const loginValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });
    return schema.validate(data)
};

module.exports.registerValidationWithEmail = registerValidationWithEmail;
module.exports.registerValidationWithMob = registerValidationWithMob;
module.exports.loginValidation = loginValidation;