const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'This is API route'
    })
})

module.exports = router;