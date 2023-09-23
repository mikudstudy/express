const express = require('express')
const controller = require('./scheduleLesson.controller')
const {requireAdmin, requireAuth} = require("../../middlewares/requireAuth.middleware");
const router = express.Router()

router.get('/', controller.getScheduleLesson)
router.get('/my', requireAuth,controller.getMyScheduleLesson) // only admin can get all lessons
router.post('/',requireAdmin, controller.addScheduleLesson) // only admin can add lessons
router.put('/sign/:id', requireAuth, controller.signToScheduleLesson)

module.exports = router
