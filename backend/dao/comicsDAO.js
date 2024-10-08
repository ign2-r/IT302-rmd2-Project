let comics;

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

    static async getComics({ filters = null, page = 0, itemsPerPage = 10 } = {}) {
        let query = {};
        if (filters) {
            if (filters.title) {
                query.title = { $regex: filters.title, $options: 'i' };
            }
        }

        let cursor;
        try {
            cursor = await comics.find(query).limit(itemsPerPage).skip(itemsPerPage * page);
            const comicsList = await cursor.toArray();
            const totalNumComics = await comics.countDocuments(query);
            return { comicsList, totalNumComics };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { comicsList: [], totalNumComics: 0 };
        }
    }
}

module.exports = ComicsDAO;
