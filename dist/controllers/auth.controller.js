"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const AuthController = {
    handleAllUsers: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAllUsers = yield auth_services_1.default.getUsers();
            return res.status(200).json({ message: "berhasil ambil semua data user", data: getAllUsers });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleCreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const newUser = yield auth_services_1.default.createUser({ name, email, password });
            return res.status(201).json({ message: "berhasil register", data: newUser });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleUpdateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { name, email, password } = req.body;
            const userUpdate = yield auth_services_1.default.updateUser(userId, { name, email, password });
            return res.status(200).json({ message: "berhasil update data user", data: userUpdate });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleDeleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const userDelete = yield auth_services_1.default.deleteUser(userId);
            return res.status(200).json({ message: "berhasil delete user", data: userDelete });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userLogin = yield auth_services_1.default.loginUser({ email, password });
            return res
                .cookie("accessToken", userLogin.accessToken, { httpOnly: true })
                .cookie("refreshToken", userLogin.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: "Login success!" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleLogout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            yield auth_services_1.default.logoutUser(refreshToken);
            return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "berhasil logout" });
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = AuthController;
