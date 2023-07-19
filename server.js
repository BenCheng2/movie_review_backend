require('dotenv').config();

// Importing modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initializing express
const app = express();
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

// Importing from middleware folder
const {logger, logEvents} = require('./middleware/logger');
const {errorHandler} = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

connectDB();

// Use middleware
app.use(logger);
app.use(cors(corsOptions));

// Use imported middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'));

app.use('/users', require('./routes/userRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log');
})
