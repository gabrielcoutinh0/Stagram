import express from "express";
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/Router.ts");
app.use(router);

app.listen(port, () => console.log(`server running on port ${port}...`));
