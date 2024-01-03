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

export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        //if the user already in the database... just generate jwt token.
        if(user) {

            console.log("User is already in the database...");

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
            const{password: pass, ...restOfUserInfo} = user._doc;
            
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(restOfUserInfo)
        } else {

            console.log("Freshly created User using OAuth...");

                //first time user using OAuth
                const generatedPassword = Math.random().toString(36).slice(-8) 
                + Math.random().toString(36).slice(-8); //36: includes 0-9 and a-z. -8 indicates last eight characters

                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

                const usernameWithRandomCharacters = req.body.name.split(" ").join("").toLowerCase() +
                                                     Math.random().toString(36).slice(-8);

                const newUser = new User({username: usernameWithRandomCharacters, email: req.body.email, password: hashedPassword, avatar: req.body.photo});

                await newUser.save();
                
                const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET); 
                const{password: pass, ...restOfUserInfo} = newUser._doc;
            
                res
                    .cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json(restOfUserInfo)
        }

    } catch (error) {
        next(error);    
    }
}

export const signout=async (req, res, next)=> {

    try {
        res.clearCookie('access_token');
        res.status(200).json("User loged out successfully");
    } catch (error) {
        next(error);
    }
}