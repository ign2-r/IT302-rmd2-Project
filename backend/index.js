const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const ComicsDAO = require('./dao/comicsDAO');
const FeedbackDAO = require('./dao/feedbackDAO'); // Import the new DAO

dotenv.config();

async function initMongoDB() {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await ComicsDAO.injectDB(client); // Initialize the comics collection
        await FeedbackDAO.injectDB(client); // Initialize the feedback collection
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit the application if connection fails
    }
}

module.exports = { initMongoDB };
