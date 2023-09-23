import {Offers} from './offersModel'
// import User from '../user/userModel'
import logger from '../../services/logger.service'

export const offersService = {
    query,
    addOffer,
    signToOffer,
}

async function query(filterBy = {}) {
    let query = Offers.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function addOffer(offer) {

  
    const offerToAdd = {
        subject: offer.subject,
        teacherId: teacher._id,
        school: offer.school,
        time: offer.time,
        teacherName: offer.teacherName,
        date: offer.date,
        price: offer.price || 100,
        paymentLink: offer.paymentLink,
    };
    return await Offers.create(offerToAdd);
}

async function signToOffer(offerId, studentId) {
    const offerToSign = await Offers.findById(offerId);
    if (!offerToSign) {
        throw new Error('offer not found');
    }
    offerToSign.students.push(studentId);
    return await offerToSign.save();

}