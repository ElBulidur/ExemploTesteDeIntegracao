import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    Jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.userEmail = decoded.email;
        next();
      }
    );
  } catch (error) {
    throw new AppError(401, "Invalid Token");
    // return res.status(401).json({ message: "Invalid Token" });
  }
};
