import bcrypt from "bcrypt" ;

export const hashPassword =async (password : string)=>{
    return await bcrypt.hash(password,10);
}

export const verifPassword = async (password : string, hashedPassword : string)=>{
    return bcrypt.compare(password,hashedPassword);
}