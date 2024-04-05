const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const promisify = require('util').promisify;
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');
require('dotenv').config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result.rows[0]);
    } finally {
        client.release();
    }
}
// getPgVersion();

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    imageURL VARCHAR(200),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const insertDataQuery = `
    INSERT INTO users (name, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
`;


//  COMMENTED SQL QUERIES FOR CREATING AND DROPPING TABLE
// pool.query(createTableQuery, (err, res) => {
//     if (err) {
//         console.error('Error creating table:', err);
//     } else {
//         console.log('Table created successfully');
//     }

//     // Close the connection pool
//     pool.end();
// });

// pool.query("DROP TABLE users", (err, res) => {
//     if (err) {
//         console.error('Error dropping table:', err);
//     }
//     else {
//         console.log('Table dropped successfully');
//         pool.query(createTableQuery, (err, res) => {
//             if (err) {
//                 console.error('Error creating table:', err);
//             } else {
//                 console.log('Table created successfully');
//             }

//             // Close the connection pool
//             pool.end();
//         })
//     }
// })
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const checkUserQuery = `
            SELECT * FROM users
            WHERE username = $1 OR email = $2;
        `;
        const checkUserResult = await pool.query(checkUserQuery, [username, email]);

        if (checkUserResult.rows.length > 0) {
            // If username or email is already taken, return appropriate message
            const takenField = checkUserResult.rows[0].username === username ? 'username' : 'email';
            return res.json({ success: false, message: `${takenField} already taken` });
        }
        else {
            await pool.query(insertDataQuery, [name, username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.json({ success: false, message: "Error inserting data" });
                }
                else {
                    console.log('Data inserted successfully:', result.rows[0]);
                    const secretKey = crypto.randomBytes(32).toString('hex');
                    const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1h' });
                    return res.json({ success: true, message: "Data inserted successfully", token: token, userId: result.rows[0].id });
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error inserting data" });
    }
})
app.post('/create-profile/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        UPDATE users
        SET imageURL = $1, location = $2
        WHERE id = $3
        RETURNING *
    `;
    const { imageUrl, location } = req.body;
    pool.query(query, [imageUrl, location, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.json({ success: false, message: "Error updating data" });
        }
        else {
            console.log('Data updated successfully:', result.rows[0]);
            return res.json({ success: true });
        }
    })
})
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // selectAll();
})