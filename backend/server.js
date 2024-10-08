const express = require('express');
const cors = require('cors');
const { initMongoDB } = require('./index');
const comics = require('./api/comics.route');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.use('/api/v1/rmd2/comics', comics);

app.listen(port, async () => {
    await initMongoDB();
    console.log(`Server is running on port ${port}`);
});
