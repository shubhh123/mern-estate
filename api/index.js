
import express from "express"
import mongoose from "mongoose";
import userRouter from './routes/user.routes.js'
import authRouter from "./routes/auth.route.js";
import dotenv from 'dotenv'
dotenv.config();



mongoose.connect("mongodb://localhost:27017/estate")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error(err);
    });


const app = express();
app.use(express.json()) //allows the server to accept JSON data
const app2 = express();
const port = 3000;

// app.get("/test", (req, res)=> {
//     res.send("Hello to this world");
// })

app.use("/api/user", userRouter);

app.use("/api/user/auth", authRouter)


//Middleware for handling errors
app.use((err, req, res, next) => {

    console.log("Error handled through middleware");

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
