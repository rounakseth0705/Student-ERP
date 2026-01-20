import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import studentRouter from "./routes/studentRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.get("/test", (req,res) => res.send("Server is live"));

app.listen(port, () => console.log(`Server is running on port ${port}`));