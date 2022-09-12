import Joi from "joi";
import { createCard } from "../repositories/cardRepository";

const cardSchema = Joi.object<Omit<createCard, "userId">>({
  number: Joi.string().required(),
  label: Joi.string().required(),
  name: Joi.string().required(),
  securityCode: Joi.string().required(),
  expiryDate: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "both").required(),
}).required();

export default cardSchema;
