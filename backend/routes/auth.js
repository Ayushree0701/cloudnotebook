const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//create user using POST "/api/auth/createuser", does not require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
],
    //applying async await
    async (req, res) => {
        console.log(req.body);

        const errors = validationResult(req);
        //if there are errors, return bad request and the errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry, user with this email already exists' });
            }

            //hashing and pwd secure
            //adding await as it would return promise
            const salt = await bcrypt.genSalt(10);
            //password in db will be stored in encrypted format
            const secPassword = await bcrypt.hash(req.body.password,salt);
            //creating new user
            user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email
            })
            /* .then(user => {res.json(user)})
                .catch(err => {console.log(err)
                res.json({error : 'Please enter a unique value for email', message : err.message})
             });*/
            res.json(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }
    })

module.exports = router;