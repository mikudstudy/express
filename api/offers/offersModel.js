import mongoose from "mongoose";
// const validator = require("validator");
// const bcrypt = require("bcrypt");

const offerSchema = new mongoose.Schema({

    icon: {
        type: String,
        required: [true, "icon is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    link: {
        type: String,
        required: [true, "Link is required"],
    },
    description: String 
});

offerSchema.pre(/^find/, async function (next) {
    next();
});

export const Offers= mongoose.model('Offers', offerSchema);