import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email }).session(session)

        if (existingUser) {
            res.status(409).json({ message: "User already exists!" })
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
        ], { session })

        const token = jwt.sign({ id: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

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

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({ message: "User not found!" })
            return
        }

        const isPasswordIsValid = bcrypt.compareSync(password, user.password)

        if (!isPasswordIsValid) {
            res.status(401).json({ message: "Invalid password!" })
            return
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(200).json({
            success: true,
            message: "User signed in successfully!",
            data: {
                token,
                user
            }
        })
    }

    catch (error) {
        next(error)
    }
}