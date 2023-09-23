"use strict";
const scheduleLessonService = require('./scheduleLesson.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const {validateToken} = require("../auth/auth.service");

module.exports = {
    getScheduleLesson,
    addScheduleLesson,
    signToScheduleLesson,
    getMyScheduleLesson,
}

async function getMyScheduleLesson(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        // find if user is in students array
        const scheduleLesson = await scheduleLessonService.query({students: user._id})
        logger.debug('scheduleLesson: ', scheduleLesson);
        res.json(scheduleLesson);
    } catch (err) {
        logger.error('Failed to get scheduleLesson', err.message)
        res.status(400).send({message: 'Failed to get scheduleLesson: ' + err.message})
    }
}

async function getScheduleLesson(req, res) {
    try {
        const scheduleLesson = await scheduleLessonService.query()
        logger.debug('scheduleLesson: ', scheduleLesson);
        res.json(scheduleLesson);
    } catch (err) {
        logger.error('Failed to get scheduleLesson', err.message)
        res.status(400).send({message: 'Failed to get scheduleLesson: ' + err.message})
    }
}

async function addScheduleLesson(req, res) {
    try {
        const marathon = req.body
        const user = validateToken(req.session.loginToken); // get the user from the token
        marathon.teacherId = user._id;
        logger.debug('marathon added', marathon);
        const addedMarathon = await scheduleLessonService.addScheduleLesson(marathon)
        res.json(addedMarathon)
    } catch (err) {
        logger.error('Failed to add marathon', err.message)
        res.status(400).send({message: 'Failed to add marathon: ' + err.message})
    }
}

async function signToScheduleLesson(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        const {marathonId} = req.params;
        const signedMarathon = await scheduleLessonService.signToScheduleLesson(marathonId, user._id);
        res.json(signedMarathon)
    } catch (err) {
        logger.error('Failed to sign to marathon', err.message)
        res.status(401).send({message: 'Failed to sign to marathon' + err.message})
    }
}
