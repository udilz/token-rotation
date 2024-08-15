import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import AuthServices from "../services/auth.services";


export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  const {accessToken, refreshToken} = req.cookies;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // if access tokennya ada
  if (accessToken) {
    try {
      //verifikasi access token di middleware
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
    } catch (error) {
      //apabila refresh tokennya gaada
      if (!refreshToken) {
        return res.json({message: "please re login"});
      }

      try {
        //verifikasi apabila refresh token ada
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
  
        //cek ke database
        const activeRefreshToken = await AuthServices.getRefTok(refreshToken);
        
        //kalo di database gaada
        if (!activeRefreshToken) {
          return res.json({message: "please re loginn"});
        }
  
        //kalo ada melakukan generate access token baru
        const payload = jwt.decode(refreshToken) as {id: string; name: string; email: string};
  
        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          process.env.JWT_ACCESS_SECRET as string,
          {
            expiresIn: 15,
          }
        );
        //set acces token baru ke cookie
        return res.cookie("accessToken", newAccessToken, {httpOnly: true});
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
  next();
};
