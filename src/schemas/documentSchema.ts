import Joi from 'joi';
import { createDocument } from '../repositories/documentsRepository';

const documentSchema = Joi.object<Omit<createDocument, 'userId'>>({
  type: Joi.string().valid('RG', 'CNH').required(),
  number: Joi.string().required(),
  name: Joi.string().required(),
  expirationDate: Joi.string().required(),
  issueDate: Joi.string().required(),
  issuer: Joi.string().required(),
}).required();

export default documentSchema;