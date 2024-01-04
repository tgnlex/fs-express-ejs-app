import Joi from '@hapi/joi';

export const registrationValidator = (data) => {
    const schema = Joi.object({
      username: Joi.string().min(6).required().alphanum(), 
      password: Joi.string().min(6).required().alphanum(),
      email: Joi.string().min(6).required().alphanum(),
    })
    return schema.validate(data);
}