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
const auth_schema_1 = require("../models/auth.schema");
const user_schema_1 = require("../models/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthRepository = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAllUsers = yield user_schema_1.User.find();
            return getAllUsers;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getRefTok: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getRefTok = yield auth_schema_1.Auth.findOne({
                refreshToken,
            });
            return getRefTok;
        }
        catch (error) {
            console.log(error);
        }
    }),
    createUser: (registerUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = registerUser;
            //hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 13);
            const newUser = {
                name,
                email,
                password: hashedPassword,
            };
            const insertUser = new user_schema_1.User(newUser);
            yield insertUser.save();
            return insertUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (userId, updateUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = updateUser;
            //hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 13);
            const userUpdate = yield user_schema_1.User.findByIdAndUpdate({ _id: userId }, { name, email, password: hashedPassword });
            const newData = new user_schema_1.User(userUpdate);
            return newData;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDelete = yield user_schema_1.User.findByIdAndDelete(userId);
            return userDelete;
        }
        catch (error) {
            console.log(error);
        }
    }),
    loginUser: (login) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = login;
            // find user by email
            const findUser = yield user_schema_1.User.findOne({
                email,
            });
            // jika email tidak ada
            if (!findUser) {
                throw new Error("user tidak ada");
            }
            //lakukan compare password apabila email ada
            const comparePass = yield bcrypt_1.default.compare(password, findUser.password);
            if (!comparePass) {
                throw new Error("password invalid");
            }
            //authorization
            const payload = {
                id: findUser.id,
                name: findUser.name,
                password: findUser.password,
            };
            //generate access token
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: 15,
            });
            //generate refresh token
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: 15,
            });
            //save refresh token to db
            const newRefreshToken = new auth_schema_1.Auth({
                userId: findUser.id,
                refreshToken,
            });
            yield newRefreshToken.save();
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log(error);
            throw new Error("login gagal");
        }
    }),
    logoutUser: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userLogout = yield auth_schema_1.Auth.deleteOne({ refreshToken });
            return userLogout;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = AuthRepository;
