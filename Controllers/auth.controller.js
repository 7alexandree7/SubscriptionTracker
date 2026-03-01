import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email}).session(session)

        if(existingUser) {
            res.status(409).json({message: "User already exists!"})
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassord = bcrypt.hashSync(password, salt)

        const newUsers = await User.create([
            {
                name,
                email,
                password: hashedPassord
            }
        ], {session})

        const token = jwt.sign({id: newUsers[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN} )

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: {
                token,
                user: newUsers[0]
            }
        })
        
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}