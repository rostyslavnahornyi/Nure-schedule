import express from "express";
import "dotenv/config";

import groupsRouter from "./routes/groups.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use("", groupsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
