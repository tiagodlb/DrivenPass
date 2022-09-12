

import Joi from 'joi';
import { createSafeNote } from '../repositories/safeNoteRepository.js';

const safeNoteSchema = Joi.object<Omit<createSafeNote, 'userId'>>({
  label: Joi.string().max(50).required(),
  content: Joi.string().max(1000).required(),
}).required();

export default safeNoteSchema;