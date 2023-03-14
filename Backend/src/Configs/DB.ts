import { set, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
set("strictQuery", false);

const url: any = process.env.MONGO_URL!;

const database_connection = connect(url);

export default database_connection;
