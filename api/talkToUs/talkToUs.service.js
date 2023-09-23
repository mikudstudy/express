const talkToUs = require("../talkToUs/talkToUsModel");
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    add,
    update,
    remove,
}

async function query(filterBy = {}) {
    let query = talkToUs.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function remove(talkToUsId) {
    await talkToUs.deleteOne({_id: ObjectId(talkToUsId)})
}

async function update(talkToUsId,talkToUs) {
    return await talkToUs.findByIdAndUpdate(talkToUsId, talkToUs, {new: true})
}

async function add(talkToUsData) {
    return await talkToUs.create(talkToUsData);
}