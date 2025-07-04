const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const {checkCloudinaryConnection} = require('./middleware')
require('dotenv').config();

app.set('trust proxy', 1);

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const lfRouter = require('./routes/lf');
const chatbotRouter = require('./routes/chatbot');

const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';

// Setting up paths and middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
};
app.use(cors(corsOptions));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

checkCloudinaryConnection();

const dbUrl = process.env.MONGODB_URI;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.STORE_SECRET
    }
});

// Secure session setup
app.use(session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
        httpOnly: true
    } 
}));

// MongoDB connection
mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.error('Error connecting to MongoDB'));

// Use routers
app.use('', userRouter);
app.use('/blog', blogRouter);
app.use('/lf', lfRouter);
app.use('/api/chatbot', chatbotRouter);

app.get('/', (req,res) => {
    res.status(200).json({message : "Backend server running"});
});

app.get('*', (req, res) => {
    res.status(500).json({ error: "Api not available" });
});

app.listen(PORT, () => {
    console.log(`Website running at: http://localhost:${PORT}/`);
});
