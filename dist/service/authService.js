import User from '../model/User.js';
import * as hashPasswordService from './hashPassword.js';
export const createUser = async (data) => {
    try {
        if (!data)
            throw new Error("Aucun Utilisateur a Ajouter");
        const hashedPassword = String(await hashPasswordService.hashPassword(data.password));
        const userToAdd = {
            userFullname: data.userFullname,
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role
        };
        return await User.create(userToAdd);
    }
    catch (err) {
        return err.message;
    }
};
export const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        if (!users)
            throw new Error("Aucun Utilisateur Trouvé");
        return users;
    }
    catch (err) {
        return err.message;
    }
};
export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user)
            throw new Error('Utilisateur Non Trouvé');
        return user;
    }
    catch (err) {
        return err.message;
    }
};
export const updateUser = async (id, data) => {
    try {
        const user = await User.findByPk(id);
        if (!user)
            throw new Error('Utilisateur Non Trouvé');
        return await user.update(data);
    }
    catch (err) {
        return err.message;
    }
};
export const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user)
            throw new Error('Utilisateur Non Trouvé');
        await user.destroy();
        return { message: 'Utilisateur Supprimé' };
    }
    catch (err) {
        return err.message;
    }
};
export const login = async (email, password) => {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user)
        throw new Error('Email ou mot de passe incorrect');
    const userData = user.get({ plain: true });
    const isValid = await hashPasswordService.verifPassword(password, userData.password);
    if (!isValid)
        throw new Error('Email ou mot de passe incorrect');
    return userData;
};
//# sourceMappingURL=authService.js.map