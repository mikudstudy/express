const talkToUsService = require('./talkToUs.service')
const logger = require('../../services/logger.service')

module.exports = {
    getTalkToUs,
    addTalkToUs,
    getTalkToUss,
    deleteTalkToUs,
    updateTalkToUs
}

async function getTalkToUs(req, res) {
    try {
        const talkToUs = await talkToUsService.getById(req.params.id)
        res.status(200).send(talkToUs)

    } catch (err) {
        logger.error('Failed to get talkToUs', err.message)
        res.status(400).send({message: 'Failed to get talkToUs: '+err.message})
    }
}

async function addTalkToUs(req, res) {
    try {
        const talkToUs = req.body
        const savedtalkToUs = await talkToUsService.add(talkToUs)
        res.status(200).send(savedtalkToUs)
    } catch (err) {
        logger.error('Failed to add talkToUs', err.message)
        res.status(400).send({message: 'Failed to add talkToUs: '+err.message})
    }
}

async function getTalkToUss(req, res) {
    try {
        const talkToUss = await talkToUsService.query()
        res.status(200).send(talkToUss)
    } catch (err) {
        logger.error('Failed to get talkToUss', err.message)
        res.status(400).send({message: 'Failed to get talkToUss: '+err.message})
    }
}
async function deleteTalkToUs(req, res) {
    try {
        await talkToUsService.remove(req.params.id)
        res.status(200).send({message: 'Deleted successfully'})
    } catch (err) {
        logger.error('Failed to delete talkToUs', err.message)
        res.status(400).send({message: 'Failed to delete talkToUs: '+err.message})
    }
}

async function updateTalkToUs(req, res) {
    try {
        const {id} = req.params
        const talkToUs = req.body
        const savedtalkToUs = await talkToUsService.update(id,talkToUs)
        res.status(200).send({talkToUs: savedtalkToUs, message: 'Updated successfully'})
    } catch (err) {
        logger.error('Failed to update talkToUs', err.message)
        res.status(400).send({message: 'Failed to update talkToUs: '+err.message})
    }
}



