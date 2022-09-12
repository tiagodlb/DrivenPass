import joi from "joi";

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).max(20).required(),
});
