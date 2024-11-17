let comics;
const { ObjectId } = require('mongodb');
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
class ComicsDAO {
    static async injectDB(conn) {
        if (comics) {
            return;
        }
        try {
            comics = await conn.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
        } catch (e) {
            console.error(`Unable to establish a collection handle in ComicsDAO: ${e}`);
        }
    }

    static async getComics({ filters = null } = {}) {
        let query = {};
    
        if (filters) {
            for (const [key, value] of Object.entries(filters)) {
                query[key] = { $regex: value, $options: 'i' }; // Case-insensitive regex for strings
            }
        }
    
        try {
            const comicsList = await comics.find(query).toArray(); // Remove limit and skip
            const totalNumComics = await comics.countDocuments(query);
    
            return { comicsList, totalNumComics };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { comicsList: [], totalNumComics: 0 };
        }
    }
    

    static async getComicById(id) {
        try {
            // Convert string ID to ObjectId for querying
            return await comics.findOne({ _id: new ObjectId(id) });
        } catch (e) {
            console.error(`Unable to find comic by ID: ${e}`);
            throw e;
        }
    }
}

module.exports = ComicsDAO;
