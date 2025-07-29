
require('dotenv').config();
const express = require('express');
const PORT = 9000;
const app = express()
const ejs = require('ejs');
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const saltRound = 10;
const uri = process.env.uri
const userRoutes = require("./routes/user.route");
app.use("/user", userRoutes);

// console.log(uri)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})
const User = mongoose.model('User', userSchema);



const connect = mongoose.connect(uri)
connect.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});



app.set('view engine', 'ejs')
app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send('Incorrect password');
        }
        response.send('Login successful');
    } catch (error) {
        console.error(error);
        response.status(500).send('Login error');
    }
});

app.post('/signup', async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        response.redirect('/login');
    } catch (err) {
        console.error(err);
        response.status(500).send('Error registering user');
    }
});

app.get('/index', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/signup', (request, response) => {
    response.render('signin');
});
app.get('/ejs', (request, response) => {
    response.render('index')
})
app.listen(PORT, () => {
    console.log('app is running on port something')
})