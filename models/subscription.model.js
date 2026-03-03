import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },

    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be a positive number"],
        max: [10000, "Subscription price must be less than 10000"]
    },

    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "BRL", "CNY", "INR", "RUB", "ZAR"],
        default: "USD"
    },

    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: [true, "Subscription frequency is required"]
    },

    category: {
        type: String,
        required: [true, "Subscription category is required"],
        enum: ["Sports", "News", "Entertainment", "Lifestyle", "Technology", "Finance", "Politics", "Other"],
    },

    paymentMethod: {
        type: String,
        required: [true, "Subscription payment method is required"],
        trim: true,
    },

    status: {
        type: String,
        enum: ["active", "inactive", "canceled", "expired"], // corrigido
        default: "active"
    },

    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Subscription start date cannot be in the future"
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: "Subscription renewal date must be after the start date"
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }

}, {
    timestamps: true
})


// ✅ Pre-save compatível com Mongoose 8 (SEM next)
subscriptionSchema.pre('save', function () {

    if (!this.renewalDate && this.frequency) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(
            this.renewalDate.getDate() + renewalPeriods[this.frequency]
        );
    }

    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription