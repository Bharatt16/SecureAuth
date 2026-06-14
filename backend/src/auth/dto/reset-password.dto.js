import Joi from "joi";

const ResetPasswordDto = Joi.object({
  password: Joi.string().min(8).required(),
});

export default ResetPasswordDto;