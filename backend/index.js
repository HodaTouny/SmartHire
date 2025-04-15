require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const passportSetup = require("./config/passport");
const { connectDB } = require("./dbConfig/dbConfig");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false, 
        sameSite: "lax" 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/User");
const emailRoutes = require("./routes/Email");

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
