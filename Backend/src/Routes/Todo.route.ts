import express, { Request, Response } from "express";
import ProductModel from "../Models/Todo.model";

const todo = express.Router();

todo.use(express.json());

todo.get("/", async (req: Request, res: Response) => {
  res.send(await ProductModel.find());
});

todo.get("/single/:id", async (req: Request, res: Response) => {
  const ids = req.params.id;
  const data = await ProductModel.find({ _id: ids });
  res.send(data);
});

todo.get("/:type", async (req: Request, res: Response) => {
  const types = req.params.type;
  const { category, page, limit = 18 } = req.query;

  if (category) {
    res.send(
      await ProductModel.find({ type: types, category: category })
        .limit(limit as number)
        .skip(((page as unknown as number) - 1) * (limit as number))
    );
  } else {
    res.send(
      await ProductModel.find({ type: types })
        .limit(limit as number)
        .skip(((page as unknown as number) - 1) * (limit as number))
    );
  }
});

todo.post("/create", async (req: Request, res: Response) => {
  try {
    await ProductModel.create(req.body);
    res.status(200).send({ msg: "Product Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

todo.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Product Modified" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

todo.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Product deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Not Found" });
  }
});

export default todo;
