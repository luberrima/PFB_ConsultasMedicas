import bcrypt from 'bcrypt';

export const hashPasswordUtil = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};