import { Request, Response } from "express";
import AuthServices from "../services/auth.services";

const AuthController = {
    handleAllUsers: async (_: Request, res: Response) => {
        try {
            const getAllUsers = await AuthServices.getUsers();
            return res.status(200).json({message: "berhasil ambil semua data user", data: getAllUsers})
        } catch (error) {
            console.log(error)
            
        }
    },

    handleCreateUser: async(req: Request, res: Response) => {
        try {
            const {name,email,password} = req.body
            const newUser = await AuthServices.createUser({name,email,password});
            return res.status(201).json({message: "berhasil register", data: newUser});
        } catch (error) {
            console.log(error)
            
        }
    },

    handleUpdateUser: async(req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const {name, email, password} = req.body
            const userUpdate = await AuthServices.updateUser(userId,{name,email,password})
            return res.status(200).json({message: "berhasil update data user", data: userUpdate})
        } catch (error) {
            console.log(error)
        }
    },

    handleDeleteUser: async(req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const userDelete = await AuthServices.deleteUser(userId);
            return res.status(200).json({message: "berhasil delete user", data: userDelete});
        } catch (error) {
            console.log(error);
        }
    },
    
    handleLogin: async(req:Request, res: Response) => {
        try {
            const {email, password} = req.body
            const userLogin = await AuthServices.loginUser({email,password});
            return res
            .cookie("accessToken",userLogin.accessToken, { httpOnly: true })
            .cookie("refreshToken", userLogin.refreshToken, { httpOnly: true })
            .status(200)
            .json({ message: "Login success!" });
        } catch (error) {
            console.log(error);
        }
    },

    handleLogout: async(req:Request, res: Response) => {
        try {
            const {refreshToken} = req.cookies;
            await AuthServices.logoutUser(refreshToken);
            return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({message: "berhasil logout"})
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthController;