import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    console.log("REQ.USER:", req.user)
    try {
        const subscription = await Subscription.create({ ...req.body, user: req.user._id })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        })
    }
    catch (error) {
        next(error)
    }
}