import express from 'express';
import bcrypt from 'bcrypt';
import { db } from './dbconnect.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// db connection check using async/await
(async () => {
    try {
        const [results] = await db.query('SELECT 1');
        console.log('Connected to database, query result:', results);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

// retrieve user by id
app.get('/users/:id', async (req, res) => {
    try {
        const [userData] = await db.query('SELECT * FROM users WHERE uid = ?', [req.params.id]);
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// retrieve restaurant by id
app.get('/restaurants/:id', async (req, res) => {
    try {
        const [restaurantData] = await db.query('SELECT * FROM restaurants WHERE rid = ?', [req.params.id]);
        res.json(restaurantData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// retrieve all restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const [restaurantData] = await db.query('SELECT * FROM restaurants');
        res.json(restaurantData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});
