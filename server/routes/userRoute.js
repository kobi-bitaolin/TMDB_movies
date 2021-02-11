
const express = require('express');
const router = express.Router();
const User = require('../modules/userModule');

router.post('/login', (req, res) =>{

    const { username, password } = req.body;
    

})