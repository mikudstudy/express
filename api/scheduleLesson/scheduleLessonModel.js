const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

const scheduleLessonSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, "fullName is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    grade: {
        type: String,
        required: [true, "grade is required"],
    },
    testType: {
        type: String,
        required: [true, "testType is required"],
    },
    lessonType: {
        type: String,
        required: [true, "lessonType is required"],
    },
    phoneNumber: {
        type: Number,
        default: 100,
    },
    helpNeeded: {
        type: String,
        required: [true, "lessonType is required"],
    },
    helpFreq: {
        type: String,
        required: [true, "lessonType is required"],
    },
    date: {
        type: Date,
        required: [true, "Start date is required"],
    },
});

scheduleLessonSchema.pre(/^find/, async function (next) {
    next();
});

module.exports = mongoose.model('ScheduleLesson', scheduleLessonSchema);