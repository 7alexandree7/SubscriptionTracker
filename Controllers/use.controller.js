import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        if (users.length === 0 || !users) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        })
    } catch (error) {
        next(error)
    }
}


export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}