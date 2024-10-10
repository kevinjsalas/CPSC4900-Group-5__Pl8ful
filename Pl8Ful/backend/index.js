import express from 'express';
import { db } from './dbconnect.js';
import createUser from './createUser.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
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


app.use('/createUser', createUser);

