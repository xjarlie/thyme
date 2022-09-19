const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Keep this last
app.get('/*', (req, res) => {
    // 404 page here
    res.status(404).send('Error 404: Page not found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});