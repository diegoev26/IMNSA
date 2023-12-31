import express from "express";
import { urlencoded, json } from "body-parser";
const app = express();
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";
import routes from "./routes/main.routes";

import "./config/mailer";

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
config.env ? null : app.use(morgan("tiny"));
app.use("/api", routes);
app.use(express.static(__dirname + "/public"));

app.set("port", config.port);
app.listen(app.get("port"), console.log(app.get("port")));
