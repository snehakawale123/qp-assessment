import express from "express";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

export default app;

