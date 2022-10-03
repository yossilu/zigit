require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const db = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MySQL
db.connect();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/Auth/register'));
app.use('/auth', require('./routes/Auth/auth'));
app.use('/refresh', require('./routes/Auth/refresh'));
app.use('/logout', require('./routes/Auth/logout'));
app.use('/project', require('./routes/Project/project'));

app.use(verifyJWT);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));