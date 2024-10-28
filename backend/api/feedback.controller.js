const FeedbackDAO = require('../dao/feedbackDAO');

class FeedbackController {
    // Method to handle POST request to add feedback
    static async apiAddFeedback(req, res, next) {
        try {
            const { comicId, text, username, userId } = req.body;
            const feedbackData = {
                comicId,
                text,
                username,
                userId,
                lastModified: new Date(),
            };

            const feedbackResponse = await FeedbackDAO.addFeedback(feedbackData);
            if (feedbackResponse.error) {
                res.status(500).json({ error: "Failed to add feedback." });
            } else {
                res.json({ status: "success", feedback: feedbackResponse });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Method to handle PUT request to update feedback
    static async apiUpdateFeedback(req, res, next) {
        try {
            const { feedbackId, text, userId } = req.body;
            const updateResponse = await FeedbackDAO.updateFeedback(feedbackId, { text, userId, lastModified: new Date() });
            
            if (updateResponse.error) {
                res.status(500).json({ error: "Failed to update feedback." });
            } else {
                res.json({ status: "success", feedback: updateResponse });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Method to handle DELETE request to delete feedback
    static async apiDeleteFeedback(req, res, next) {
        try {
            const { feedbackId, userId } = req.body;
            const deleteResponse = await FeedbackDAO.deleteFeedback(feedbackId, userId);
            
            if (deleteResponse.error) {
                res.status(500).json({ error: "Failed to delete feedback." });
            } else {
                res.json({ status: "success" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FeedbackController;
