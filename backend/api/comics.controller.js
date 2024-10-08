const ComicsDAO = require('../dao/comicsDAO');

class ComicsController {
    static async apiGetComics(req, res, next) {
        const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 10;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
        const filters = {};
        if (req.query.title) {
            filters.title = req.query.title;
        }

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
    }
}

module.exports = ComicsController;
