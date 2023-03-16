import express, { Request, Response } from "express";
import TodoModel from "../Models/Todo.model";

const todo = express.Router();

todo.use(express.json());

todo.get("/", async (req: Request, res: Response) => {
  try {
    const data:object[]=await TodoModel.find({userID:req.body.userID})
    res.status(200).send({data:data});
  } catch (error) {
    console.log(error);
    res.status(500).send("error")
  }
});

todo.post("/create", async (req: Request, res: Response) => {
  try {
    let post=await TodoModel.create(req.body);
    res.status(200).send({ msg: "Todo Added",data:post });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

todo.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TodoModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Todo Modified" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

todo.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TodoModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Todo deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

export default todo;
