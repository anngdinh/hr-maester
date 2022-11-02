// Require express and create an instance of it
var express = require('express');
const connectDB = require('./config/connectDB')

const authRouter = require('./routes/auth');
const payrollRouter = require('./routes/payroll');

require('dotenv').config();

var app = express();

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.use('/api/auth', authRouter);
app.use('/api/payroll', payrollRouter);

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const port = process.env.PORT || 3000;

// start the server in the port 3000 !
app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});