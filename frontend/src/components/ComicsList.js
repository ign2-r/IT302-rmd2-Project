import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ComicsDataService from '../service/ComicsDataService';
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
function ComicsList() {
    const [comics, setComics] = useState([]);
    const [field, setField] = useState('title'); // Default search field
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        retrieveComics();
    }, []);

    const retrieveComics = () => {
        ComicsDataService.getAll()
            .then(response => setComics(response.data.comics))
            .catch(error => console.error(error));
    };

    const search = () => {
        if (field === 'id') {
            ComicsDataService.getById(searchText)
                .then((response) => {
                    // Safeguard to handle cases where no comic is found
                    setComics(response.data ? [response.data] : []);
                })
                .catch((error) => console.error(error));
        } else {
            ComicsDataService.findByField(field, searchText)
                .then((response) => {
                    // Set comics for non-id searches
                    setComics(response.data.comics);
                })
                .catch((error) => console.error(error));
        }
    };        

    return (
        <div className="container mt-4">
            <h1>Comics List</h1>
            <div className="mb-3">
                <select
                    className="form-select mb-2"
                    value={field}
                    onChange={e => setField(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="safe_title">Safe Title</option>
                    <option value="id">ID</option>
                    <option value="year">Year</option>
                </select>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search Text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={search}>
                    Search
                </button>
            </div>
    
            {/* Conditional Rendering */}
            {comics.length > 0 ? (
                <ul>
                    {comics.map(comic => (
                        <li key={comic._id}>
                            <Link to={`/rmd2_comics/id/${comic._id}`}>{comic.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comics found.</p> // Display this when no comics are available
            )}
        </div>
    );
}

export default ComicsList;
