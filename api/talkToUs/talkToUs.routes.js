const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const controller = require('./talkToUs.controller')
const router = express.Router()

router.get('/', controller.getTalkToUss)
router.get('/:id', controller.getTalkToUs)
router.post('/', controller.addTalkToUs)
router.put('/:id', requireAuth, requireAdmin, controller.updateTalkToUs)
router.delete('/:id', requireAuth, requireAdmin, controller.deleteTalkToUs)


module.exports = router
