
import express from "express"
import mongoose from "mongoose";
import userRouter from './routes/user.routes.js'

mongoose.connect("mongodb://localhost:27017/estate")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error(err);
    });


const app = express();
const port = 3000;

// app.get("/test", (req, res)=> {
//     res.send("Hello to this world");
// })

app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
