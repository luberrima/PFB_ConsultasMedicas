import joi from 'joi';

import { joiErrorMessages } from '../joiErrorMessages.js';

export const recoveryPassSchema = joi
    .object({
        email: joi.string().email().required(),
    })
    .messages(joiErrorMessages);
