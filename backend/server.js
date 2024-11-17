const express = require('express');
const cors = require('cors');
const { initMongoDB } = require('./index');
const comics = require('./api/comics.route');
const feedback = require('./api/feedback.route');
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
const app = express();
app.use(cors());
app.use(express.json());

const port = 5001;

app.use('/api/v1/rmd2/comics', comics);
app.use('/api/v1/rmd2/feedback', feedback);

app.listen(port, async () => {
    await initMongoDB();
    console.log(`Server is running on port ${port}`);
});
