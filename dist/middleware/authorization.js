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
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // if access tokennya ada
    if (accessToken) {
        try {
            //verifikasi access token di middleware
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        }
        catch (error) {
            //apabila refresh tokennya gaada
            if (!refreshToken) {
                return res.json({ message: "please re login" });
            }
            try {
                //verifikasi apabila refresh token ada
                jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                //cek ke database
                const activeRefreshToken = yield auth_services_1.default.getRefTok(refreshToken);
                //kalo di database gaada
                if (!activeRefreshToken) {
                    return res.json({ message: "please re loginn" });
                }
                //kalo ada melakukan generate access token baru
                const payload = jsonwebtoken_1.default.decode(refreshToken);
                const newAccessToken = jsonwebtoken_1.default.sign({
                    id: payload.id,
                    name: payload.name,
                    email: payload.email,
                }, process.env.JWT_ACCESS_SECRET, {
                    expiresIn: 15,
                });
                //set acces token baru ke cookie
                return res.cookie("accessToken", newAccessToken, { httpOnly: true });
            }
            catch (error) {
                console.log(error);
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
    }
    next();
});
exports.authorization = authorization;
