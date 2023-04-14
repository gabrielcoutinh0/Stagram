import express from "express";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
import { router } from "./routes/Router";

dotenv.config();

const port = process.env.PORT;
const origin = process.env.FRONTEND_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: origin }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./config/db.ts");

app.use(router);

app.listen(port, () => console.log(`server running on port ${port}...`));
