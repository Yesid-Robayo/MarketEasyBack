import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

export const verifyPassword = async (enteredPassword: string, storedHash: string) => {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    return match; 
};