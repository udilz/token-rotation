import AuthRepository from "../repositories/auth.repository"
import { ILogin, ILoginResponse, IUser } from "../types/todo.types";

const AuthServices = {
    getUsers: async () => {
        try {
            const getAllUsers = await AuthRepository.getUsers();
            return getAllUsers;
        } catch (error) {
            console.log(error);
        }
    },
    
    getSingleUser: async (id: string) => {
        try {
            const getOne = await AuthRepository.getSingleUser(id);
            return getOne;
        } catch (error) {
            console.log(error)
        }
    },

    getRefTok: async(refreshToken : string) => {
        try {
            const getRefTok = await AuthRepository.getRefTok(refreshToken);
            return getRefTok;
        } catch (error) {
            console.log(error);
        }
    },

    createUser: async (registerUser: IUser) => {
        try {
            const newUser = await AuthRepository.createUser(registerUser);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async(userId: string, updateUser: IUser)  => {
        try {
            const userUpdate = await AuthRepository.updateUser(userId,updateUser);
            return userUpdate;
        } catch (error) {
            console.log(error)
        }
    },

    deleteUser: async(userId: string) => {
        try {
            const userDelete = await AuthRepository.deleteUser(userId);
            return userDelete;
        } catch (error) {
            console.log(error);
        }
    },

    loginUser: async (login: ILogin): Promise<ILoginResponse> => {
        try {
            const {email,password} = login;
            if(!email || !password) {
                throw new Error("email atau password harus diisi")
            }
            const userLogin = await AuthRepository.loginUser(login);
            return userLogin;
        } catch (error) {
            throw new Error("login gagal");
        }
    },

    logoutUser: async(refreshToken: string) => {
        try {
            const userLogout = await AuthRepository.logoutUser(refreshToken);
            return userLogout;
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthServices;