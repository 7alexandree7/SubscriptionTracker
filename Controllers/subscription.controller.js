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


export const getSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        const subscriptions = await Subscription.find({ user: req.params.id })
        res.status(200).json({
            success: true,
            message: "Subscriptions retrieved successfully",
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}


export const getAllSubscriptions = async (req, res, next) => {
    try {

        const allSubscriptions = await Subscription.find()
        if (!allSubscriptions) {
            return res.status(404).json({
                success: false,
                message: "No subscriptions found"
            })
        }
        res.status(200).json({
            success: true,
            message: "All subscriptions retrieved successfully",
            data: allSubscriptions
        })

    } catch (error) {
        next(error)
    }
}


export const getSubscriptionsDetails = async (req, res, next) => {
    try {
        const subscriptionDetails = await Subscription.findById(req.params.id)

        if (!subscriptionDetails) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Subscription details retrieved successfully",
            data: subscriptionDetails
        })
    } catch (error) {
        next(error)
    }
}


export const updateSubscription = async (req, res, next) => {
    try {

        const updateSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updateSubscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: updateSubscription
        })

    } catch (error) {
        next(error)
    }
}


export const deleteSubscription = async (req, res, next) => {
    try {
        const deleteSubscription = await Subscription.findByIdAndDelete(req.params.id)
        if (!deleteSubscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: deleteSubscription
        })
    } catch (error) {
        next(error)
    }
}