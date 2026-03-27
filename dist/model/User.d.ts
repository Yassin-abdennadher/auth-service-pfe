export interface IUser {
    id: number;
    userFullname: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'technicien' | 'user';
}
declare const User: import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export default User;
//# sourceMappingURL=User.d.ts.map