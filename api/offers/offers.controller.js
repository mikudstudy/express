"use strict";
import {offersService} from './offers.service'
import {userService} from '../user/user.service'
import logger from '../../services/logger.service'
import {authService} from "../auth/auth.service";
const validateToken = authService.validateToken;
export const controller= {
    getOffers,
    addOffer,
    signToOffer,
    getMyOffers,
}

async function getMyOffers(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        // find if user is in students array
        const offers = await offersService.query({students: user._id})
        logger.debug('offers: ', offers);
        res.json(offers);
    } catch (err) {
        logger.error('Failed to get offers', err.message)
        res.status(400).send({message: 'Failed to get offers: ' + err.message})
    }
}

async function getOffers(req, res) {
    try {
        const offers = await offersService.query()
        logger.debug('offers: ', offers);
        res.json(offers);
    } catch (err) {
        logger.error('Failed to get offers', err.message)
        res.status(400).send({message: 'Failed to get offers: ' + err.message})
    }
}

async function addOffer(req, res) {
    try {
        const offers = req.body
        const user = validateToken(req.session.loginToken); // get the user from the token
        offers.teacherId = user._id;
        logger.debug('offers added', offers);
        const addedOffer = await offersService.addOffer(offers)
        res.json(addedOffer)
    } catch (err) {
        logger.error('Failed to add offers', err.message)
        res.status(400).send({message: 'Failed to add offers: ' + err.message})
    }
}

async function signToOffer(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        const {offersId} = req.params;
        const signedOffer = await offersService.signToOffer(offersId, user._id);
        res.json(signedOffer)
    } catch (err) {
        logger.error('Failed to sign to offers', err.message)
        res.status(401).send({message: 'Failed to sign to offers' + err.message})
    }
}
