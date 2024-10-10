import { db } from './dbconnect.js';
import { hashPassword } from "./passwordHash.js";
import express from 'express';

const router = express.Router();

router.put('/create', async (req, res) => {
    console.log('Request body:', req.body);  // Log the incoming request body
    try {
        await db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
            [req.body.username, req.body.email, await hashPassword(req.body.password)]);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(err);  // Log the actual error
        res.status(500).json({ error: 'Database query failed' });  // Error response
    }
});

export default router;
