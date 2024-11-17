import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComicsDataService from '../service/ComicsDataService';
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
function Comic() {
    const { id } = useParams();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        ComicsDataService.getById(id)
            .then(response => setComic(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!comic) return <div>Loading...</div>;

    return (
        <div>
            <h1>{comic.title}</h1>
            <img src={comic.img} alt={comic.alt} />
            <p>{comic.transcript}</p>
            <p>{comic.alt}</p>
        </div>
    );
}

export default Comic;
