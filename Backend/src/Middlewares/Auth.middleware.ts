import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    try {
      const sec: string = process.env.SEC_KEY!;
      const decoded: any = JWT.verify(token, sec);
      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.status(400).send({ message: "User Not Found, Try Logging In" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: "Invalid token, authorization denied" });
    }
  } else {
    res.status(400).send({ message: "User Not Found, Try Logging In" });
  }
};

export { auth };
