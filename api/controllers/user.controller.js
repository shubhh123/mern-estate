import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res)=> {
    res.json({
        message: "Hello world"
    });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"));

    try {
        if (req.body.password) {
            console.log("hashing password...");
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }   
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, // 1. User ID to find the user in the database
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        avatar: req.body.avatar,
                    }
                }, { new: true } //is an option that instructs MongoDB to return the
                                // updated document after the update operation. 
                                //The result, in this case, is stored in the updatedUser variable.
                ); 

            const { password, ...rest } = updatedUser._doc;
            
            res.status(200).json(rest);
        } catch (error) {
        next(error);
    }
};
