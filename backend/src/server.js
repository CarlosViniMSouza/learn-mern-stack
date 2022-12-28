const express = require('express');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const colors = require('colors');
const connectDB = require('./config/db');

// Call the connection with DB
connectDB();

const { errorHandler } = require('./middlewares/errorMiddleware');

// Use features from express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use map routers to express.Router()
app.use('/api/goals', require('./routes/goalRoutes'));

// Use middlewares
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'BackEnd Working ...'});
});

app.listen(port, () => console.log(`Server ON at PORT ${port}`));
