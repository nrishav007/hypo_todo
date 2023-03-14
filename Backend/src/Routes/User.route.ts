import express, { Router, Request, Response } from "express";
const user: Router = express.Router();
user.use(express.json());
import UserModel from "../Models/User.model";

user.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({ userID: req.body.userID });
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(409).send({ msg: "Not Found" });
  }
});

user.post("/create", async (req: Request, res: Response) => {
  try {
    req.body.administration = false;
    await UserModel.create(req.body);
    res.status(200).send({ msg: "user Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

user.patch("/update/:userID", async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    await UserModel.findByIdAndUpdate({ _id: userID }, req.body);
    res.status(200).send({ msg: "User Modified" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

user.delete("/delete/:userID", async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    await UserModel.findByIdAndDelete(userID);
    res.status(200).send({ msg: "user Modified" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

export default user;
