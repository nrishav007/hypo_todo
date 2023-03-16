import { Document, Model, model, Schema } from "mongoose";

interface ITodo extends Document {
  task: string;
  userID: string;
  complete: boolean;
}

const TodoSchema = new Schema({
  task: String,
  userID: String,
  complete: Boolean,
});

const TodoModel: Model<ITodo> = model<ITodo>("Todo", TodoSchema);

export default TodoModel;
