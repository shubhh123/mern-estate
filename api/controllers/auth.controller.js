import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req, res)=>{
    //console.log(req.body);

    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save(); //code waits here until the user is saved...
        res.status(201).json("User created successfully");

    } catch(err) {
        res.status(500).json(err.message);
    }

};