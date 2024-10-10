import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'pl8ful'
})

export const db = pool.promise();