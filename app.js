const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const pollController = require('./pollController');

const app = express();

app.set('view engine', 'ejs');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', pollController.renderHome);

app.get('/create', pollController.createPollController);
app.post('/create', pollController.createPollPostController);

app.get('/poll/:id', pollController.getSinglePoll);
app.post('/poll/:id', pollController.postSinglePoll);
app.get('/polls', pollController.renderPolls);


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});