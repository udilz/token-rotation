
import { Auth } from "../models/auth.schema";
import {User} from "../models/user.schema";
import {ILogin, ILoginResponse, IUser} from "../types/todo.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const AuthRepository = {
  getUsers: async () => {
    try {
      const getAllUsers = await User.find();
      return getAllUsers;
    } catch (error) {
      console.log(error);
    }
  },

  getRefTok: async (refreshToken : string) => {
    try {
      const getRefTok = await Auth.findOne({
        refreshToken,
      })
      return getRefTok;
    } catch (error) {
      console.log(error)
    }
  },

  createUser: async (registerUser: IUser) => {
    try {
      const {name, email, password} = registerUser;

      //hash password
      const hashedPassword = await bcrypt.hash(password, 13);
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
      const insertUser = new User(newUser);
      await insertUser.save();
      return insertUser;
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async (userId: string, updateUser: IUser) => {
    try {
      const {name, email, password} = updateUser;

      //hash password
      const hashedPassword = await bcrypt.hash(password, 13);
      const userUpdate = await User.findByIdAndUpdate({_id: userId}, {name, email, password: hashedPassword});
      const newData = new User(userUpdate);
      return newData;
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const userDelete = await User.findByIdAndDelete(userId);
      return userDelete;
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async (login: ILogin): Promise<ILoginResponse> => {
    try {
      const {email,password} = login;

       // find user by email
       const findUser = await User.findOne({
        email,
      });

      // jika email tidak ada
      if(!findUser) {
        throw new Error("user tidak ada");
      }

      //lakukan compare password apabila email ada
      const comparePass = await bcrypt.compare(password, findUser.password as string)

      if(!comparePass) {
        throw new Error ("password invalid");
      }

      //authorization
      const payload = {
        id: findUser.id,
        name: findUser.name,
        password: findUser.password,
      }

      //generate access token
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: 15,
      }) 

      //generate refresh token
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: 15,
      })

      //save refresh token to db
      const newRefreshToken = new Auth ({
        userId: findUser.id,
        refreshToken,
      })

      await newRefreshToken.save();
      return {accessToken, refreshToken};

    } catch (error) {
      console.log(error)
      throw new Error("login gagal");
    }
  },

  logoutUser: async(refreshToken: string) => {
    try {
      const userLogout = await Auth.deleteOne({refreshToken})
      return userLogout;
    } catch (error) {
      console.log(error);
    }
  } 
};

export default AuthRepository;
