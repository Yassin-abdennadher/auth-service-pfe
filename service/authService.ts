import User from '../model/User.js';

export const createUser = async (data: any) => {
    return await User.create(data);
};

export const getAllUsers = async () => {
    return await User.findAll();
};

export const getUserById = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('utilisateur non trouvé');
    return user;
};

export const updateUser = async (id: string, data: any) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('utilisateur non trouvé');
    return await user.update(data);
};

export const deleteUser = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('utilisateur non trouvé');
    await user.destroy();
    return { message: 'utilisateur supprimé' };
};