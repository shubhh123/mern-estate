
import express from "express"
import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/estate")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error(err);
    });


const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
