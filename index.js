const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./models/User');
const Idea = require('./models/Idea')

app.use(bodyParser.json());


app.use('/api', require('./routes/api/index.js'));

app.get('*', (req, res) => {
    res.json({message: 'not api found'});
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error in running server");
        return;
    }
    console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});