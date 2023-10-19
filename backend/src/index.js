import express from "express";
import { urlencoded, json } from "body-parser";
const app = express();
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
config.env ? null : app.use(morgan("tiny"));
//app.use(express.static(__dirname + "/public"));

app.set("port", config.port);
app.listen(app.get("port"), console.log(app.get("port")));
