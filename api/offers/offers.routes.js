import express from 'express';
import {controller} from './offers.controller';
import {requireAdmin, requireAuth} from "../../middlewares/requireAuth.middleware";

const router = express.Router()

router.get('/', controller.getOffers)
// router.get('/my', requireAuth,controller.getMyOffers) // only admin can get all lessons
// router.post('/',requireAdmin, controller.addOffer) // only admin can add lessons
// router.put('/sign/:id', requireAuth, controller.signToOffer)

export const offersRoutes ={router}
