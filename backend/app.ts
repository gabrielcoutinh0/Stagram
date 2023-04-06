const express = require("express");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`server running on port ${port}...`));

