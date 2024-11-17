const ComicsDAO = require('../dao/comicsDAO');
class ComicsController {
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
    static async apiGetComics(req, res, next) {
        const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 10;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
        const filters = {};

        // Handle query parameters dynamically
        if (req.query.field && req.query.searchText) {
            filters[req.query.field] = req.query.searchText;
        }

        try {
            const { comicsList, totalNumComics } = await ComicsDAO.getComics({
                filters,
                page: pageNumber,
                itemsPerPage,
            });

            let response = {
                comics: comicsList,
                page: pageNumber,
                filters: filters,
                entries_per_page: itemsPerPage,
                total_results: totalNumComics,
            };

            res.json(response);
        } catch (e) {
            console.error(`Error occurred while getting comics: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetComicById(req, res, next) {
        try {
            const comicId = req.params.id;
            const comic = await ComicsDAO.getComicById(comicId);

            if (!comic) {
                res.status(404).json({ error: 'Comic not found' });
                return;
            }

            res.json(comic);
        } catch (e) {
            console.error(`Error occurred while getting comic by ID: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = ComicsController;
