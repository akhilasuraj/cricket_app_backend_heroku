const router = require('express').Router();
const User = require('../model/User');
const { registerValidation,loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req,res) => {

 // validation the data
 const { error } = registerValidation(req.body);
 if ( error ) return res.status(400).send(error.details[0].message);
 // checking the user is already exists
 const emailExists = await User.findOne({email: req.body.email});
 if(emailExists) return res.status(400).send('Email already exists');
 // Hash password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);
// create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
         const savedUser = await user.save();
         res.send({ user : user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


//LOGIN
router.post('/login', async (req, res) => {
// validation the data
const { error } = loginValidation(req.body);
if ( error ) return res.status(400).send(error.details[0].message);
//checking the email exists
const user = await User.findOne({email: req.body.email});
 if(!user) return res.status(400).send('Email is not found');
// check password
const validPass = await bcrypt.compare(req.body.password, user.password);
if (!validPass) return res.status(400).send('Invalid password');
//create token
const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{ expiresIn:1440 })
res.header('auth-token',token).send(token);
console.log("logged In");
})


module.exports = router;