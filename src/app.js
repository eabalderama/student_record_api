const express = require('express');

const router = express.Router();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
require('dotenv').config();
require('./api/db');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

router.use('/student', require('./api/routes/StudentRoute'));
// router.use('/account', require('./api/routes/account'));
// router.use('/category', require('./api/routes/category'));
// router.use('/expense', require('./api/routes/expense'));

app.use('/api', router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
