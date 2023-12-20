import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next)=>{
    //console.log(req.body);

    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save(); //code waits here until the user is saved...
        res.status(201).json("User created successfully");
    } catch(err) {
        //next(errorHandler(550, "Error from function"));
        next(err);
    }
};

export const signin = async(req, res, next)=>{

    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(404, "User Not found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, "Wrong credentials"));


        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET); 

        //To omit user password being sent over
        /*
            password: pass: It takes 
            the password property from 
            validUser._doc and assigns 
            it to a variable named pass.
        */

        const{password: pass, ...restOfUserInfo} = validUser._doc;

        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(restOfUserInfo);

    } catch (error) {
        next(error);
    }
}