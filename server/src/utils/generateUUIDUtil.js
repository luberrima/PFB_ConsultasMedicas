import crypto from 'crypto';

export const generateUUIDUtil = () => {
    return crypto.randomUUID();
};