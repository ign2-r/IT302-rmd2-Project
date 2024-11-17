import axios from 'axios';
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
const API_URL = process.env.REACT_APP_BACKEND_URL;

class ComicsDataService {
    getAll() {
        return axios.get(`${API_URL}/api/v1/rmd2/comics`);
    }

    getById(id) {
        return axios.get(`${API_URL}/api/v1/rmd2/comics/id/${id}`);
    }

    findByField(field, value) {
        return axios.get(`${API_URL}/api/v1/rmd2/comics`, {
            params: { field, searchText: value },
        });
    }
}

export default new ComicsDataService();
