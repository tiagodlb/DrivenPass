import Joi from 'joi';
import { createWifi } from '../repositories/wifiRepository.js';

const wifiSchema = Joi.object<Omit<createWifi, 'userId'>>({
  label: Joi.string().required(),
  ssid: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export default wifiSchema;