const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const collection = require('./config'); 

const app = express();

// convert data into json format 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        number: req.body.number,
        password: req.body.password
    };

    // Check if the user already exists
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.render("signup", { error: "User already exists. Please choose a different username." });
    } else {
        // Hash the password 
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        await collection.insertMany(data);
        res.render("login");
    }
});

// Login user
app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.render("login", { error: "Username not found" });
        } else {
            // Compare the hashed password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                res.render("home");
            } else {
                res.render("login", { error: "Password is not correct!" });
            }
        }
    } catch {
        res.render("login", { error: "Wrong details" });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log('server is running on port', port);
});
