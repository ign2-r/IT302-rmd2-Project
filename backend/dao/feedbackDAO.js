const { ObjectId } = require('mongodb'); // Required for working with MongoDB ObjectId

let feedbackCollection;

class FeedbackDAO {
    static async injectDB(client) {
        if (feedbackCollection) return;
        try {
            feedbackCollection = await client.db(process.env.DB_NAME).collection("feedback");
        } catch (e) {
            console.error(`Unable to establish collection handles in feedbackDAO: ${e}`);
        }
    }

    // Method to add new feedback
    static async addFeedback(feedbackData) {
        try {
            feedbackData.lastModified = new Date();
            const result = await feedbackCollection.insertOne(feedbackData);
            return result;
        } catch (e) {
            console.error(`Error adding feedback: ${e}`);
            return { error: e };
        }
    }

    // Method to update existing feedback
    static async updateFeedback(feedbackId, updatedData) {
        try {
            const updateResponse = await feedbackCollection.updateOne(
                { _id: new ObjectId(feedbackId) }, // Match the document by _id
                { $set: { ...updatedData, lastModified: new Date() } } // Update fields and set lastModified
            );
            return updateResponse;
        } catch (e) {
            console.error(`Error updating feedback: ${e}`);
            return { error: e };
        }
    }

    // Method to delete feedback
    static async deleteFeedback(feedbackId, userId) {
        try {
            const deleteResponse = await feedbackCollection.deleteOne({
                _id: new ObjectId(feedbackId), // Match the document by _id
                userId: userId // Optional: Ensure only the user's own feedback can be deleted
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Error deleting feedback: ${e}`);
            return { error: e };
        }
    }
}

module.exports = FeedbackDAO;
