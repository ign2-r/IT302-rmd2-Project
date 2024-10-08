const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const ComicsDAO = require('./dao/comicsDAO');

dotenv.config();

async function initMongoDB() {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await ComicsDAO.injectDB(client);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = { initMongoDB };
