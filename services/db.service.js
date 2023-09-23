// const MongoClient = require('mongodb').MongoClient

import mongoose from 'mongoose'
import logger from './logger.service.js'
const dbService ={
  getCollection,
  connect,
}
async function getCollection(collectionName) {
  try {
    return await db.collection(collectionName)
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  mongoose.connect(
      process.env.DB_URI.replace("<password>", process.env.DB_PASS)
  ).then(()=>logger.error('success')).catch((err)=>logger.error('Failed to get Mongo collection', err));
}
export default  dbService;