import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
export const verifPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
//# sourceMappingURL=hashPassword.js.map