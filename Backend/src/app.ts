import express, { Application, Request, Response } from "express";
import env from "dotenv";
import database_connection from "./Configs/DB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { auth } from "./Middlewares/Auth.middleware";
import user from "./Routes/User.route";
import todo from "./Routes/Todo.route";
import UserModel from "./Models/User.model";

env.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3400");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", user);
app.use("/todo", todo);
app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send("deployed");
  } catch (e) {
    console.log(e);
    res.status(409).send({ msg: "Not Found" });
  }
});
app.post("/signup", async (req: Request, res: Response) => {
  try {
    let data = await UserModel.find({ email: req.body.email });
    if (data.length > 0) {
      res.status(200).send({ msg: "User Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        }
        req.body.password = hash;
        req.body.administration = false;
        await UserModel.create(req.body);
        res.status(200).send({ msg: "User registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new user" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    interface User {
      _id: string;
      password: string;
      username: string;
      email:string;
      mobile:number
    }
    let data: User[] = await UserModel.find({ username: req.body.username });
    let uerPass: any = data[0].password;
    if (data.length <= 0) {
      res.status(200).send({ msg: "User not found" });
    } else {
      bcrypt.compare(req.body.password, uerPass, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        } else if (result) {
          jwt.sign(
            { userID: data[0]._id },
            process.env.SEC_KEY as string,
            (err: any, token: any) => {
              res.status(200).send({
                msg: "User login Successfully",
                token: token,
                displayName: data[0].username,
              });
            }
          );
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to login" });
  }
});

app.use(auth);

app.listen(port, () => {
  try {
    database_connection;
    console.log(`database connected and listening to http://localhost:${port}`);
  } catch (e) {
    console.log(e);
    console.log("App is not listening");
  }
});
