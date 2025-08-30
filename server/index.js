import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

dotenv.config();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup lowdb
const adapter = new JSONFile('server/db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { posts: [] }; // Ensure posts array exists

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve static files from root

// --- AUTHENTICATION ---
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // In a real app, you would look up the user in a database and check a hashed password.
    if (email === 'admin@example.com' && password === 'password') {
        const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- BLOG API ROUTES ---

// GET all posts (public)
app.get('/api/posts', async (req, res) => {
    await db.read();
    // Return posts in reverse chronological order (newest first)
    const posts = [...db.data.posts].reverse();
    res.json(posts);
});

// POST a new post (protected)
app.post('/api/posts', authenticateToken, async (req, res) => {
    const newPost = {
        id: `post_${nanoid()}`,
        ...req.body,
    };
    db.data.posts.push(newPost);
    await db.write();
    res.status(201).json(newPost);
});

// PUT (update) a post (protected)
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
    const postIndex = db.data.posts.findIndex(p => p.id === req.params.id);
    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }
    const updatedPost = { ...db.data.posts[postIndex], ...req.body };
    db.data.posts[postIndex] = updatedPost;
    await db.write();
    res.json(updatedPost);
});

// DELETE a post (protected)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
    const postIndex = db.data.posts.findIndex(p => p.id === req.params.id);
    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }
    db.data.posts.splice(postIndex, 1);
    await db.write();
    res.status(204).send(); // No Content
});

// --- CONTACT FORM API ---
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!process.env.SMTP_HOST) {
        console.warn("SMTP not configured. Skipping email sending.");
        // Still return success to the client for a good UX
        return res.status(200).send('Message received (SMTP not configured on server).');
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`, // sender address
            to: "williameleazar51@gmail.com", // list of receivers
            subject: "New Contact Form Message from Project Success Hub",
            text: message,
            html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
        });
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Failed to send message.');
    }
});


// Catch-all to serve index.html for any other request (enables client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
