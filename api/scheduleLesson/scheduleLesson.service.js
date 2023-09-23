const ScheduleLesson = require('./scheduleLessonModel')
const User = require('../user/userModel')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    addScheduleLesson,
    signToScheduleLesson,
}

async function query(filterBy = {}) {
    let query = ScheduleLesson.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function addScheduleLesson(scheduleLesson) {

 
    const scheduleLessonToAdd = {
        fullName: scheduleLesson.fullName,
        email: scheduleLesson.email,
        grade: scheduleLesson.grade,
        testType: scheduleLesson.testType,
        lessonType: scheduleLesson.lessonType,
        date: scheduleLesson.date,
        phoneNumber: scheduleLesson.phoneNumber || 100,
        helpNeeded: scheduleLesson.helpNeeded,
        helpFreq: scheduleLesson.helpFreq,
    };
    return await ScheduleLesson.create(scheduleLessonToAdd);
}

async function signToScheduleLesson(scheduleLessonId, studentId) {
    const scheduleLessonToSign = await ScheduleLesson.findById(scheduleLessonId);
    if (!scheduleLessonToSign) {
        throw new Error('scheduleLesson not found');
    }
    scheduleLessonToSign.students.push(studentId);
    return await scheduleLessonToSign.save();

}