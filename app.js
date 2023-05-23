const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const adminRouter = require('./routers/api/admin');
const clientsRouter = require('./routers/api/clients');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/clients', clientsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    res.status(status).json({ message: error.message });
});

module.exports = app;