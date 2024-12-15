const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult} = require('express-validator');

//create user using POST "/api/auth/", does not require auth
router.post('/', [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min : 5})
],
    (req, res)=>{
    console.log(req.body);
   
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send(req.body);
})

module.exports = router;