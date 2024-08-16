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
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const AuthServices = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAllUsers = yield auth_repository_1.default.getUsers();
            return getAllUsers;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getRefTok: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getRefTok = yield auth_repository_1.default.getRefTok(refreshToken);
            return getRefTok;
        }
        catch (error) {
            console.log(error);
        }
    }),
    createUser: (registerUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield auth_repository_1.default.createUser(registerUser);
            return newUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (userId, updateUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userUpdate = yield auth_repository_1.default.updateUser(userId, updateUser);
            return userUpdate;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDelete = yield auth_repository_1.default.deleteUser(userId);
            return userDelete;
        }
        catch (error) {
            console.log(error);
        }
    }),
    loginUser: (login) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = login;
            if (!email || !password) {
                throw new Error("email atau password harus diisi");
            }
            const userLogin = yield auth_repository_1.default.loginUser(login);
            return userLogin;
        }
        catch (error) {
            throw new Error("login gagal");
        }
    }),
    logoutUser: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userLogout = yield auth_repository_1.default.logoutUser(refreshToken);
            return userLogout;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = AuthServices;
