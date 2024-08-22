// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import userRoutes from "./modules/userModule/routes/userRoutes.js";
// import { connection } from "./config/database.js";
// import passportConfig from './passport.js'; // Import the passport configuration

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json()); // Parse JSON request bodies

// // Initialize Passport
// app.use(passport.initialize());

// app.use('/users', userRoutes);

// const startServer = async () => {
//     try {
//         await connection(); // Establish database connection
//         app.listen(PORT, () => {
//             console.log(`Server is running at http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start the server:', error);
//     }
// };

// startServer();

















import express from "express";
import session from "express-session";
import passport from "./config/passport.js"; // Import the passport configuration
import userRoutes from "./modules/userModule/routes/userRoutes.js";
import { connection } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);

const startServer = async () => {
    try {
        await connection(); // Establish database connection
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
