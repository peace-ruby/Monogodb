const express = require('express');
const router = express.Router();

// Example GET route
router.get('/profile', (req, res) => {
    res.send('User profile route works!');
});

// You can add more user-related routes here

module.exports = router;