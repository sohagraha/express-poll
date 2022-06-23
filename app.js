const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3001');
    });
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});