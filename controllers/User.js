
const User = require('../model/User');
const { registerValidationWithEmail,loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var regex1 = /^\+94\d{9,9}/;
var regex2 = /^\d{10}/;
//REGISTER
exports.register= async (req,res) => {

    // validation the data
    if(req.body.mobile_no == null){
        const { error } = registerValidationWithEmail(req.body);
        if ( error ) return res.status(400).send(error.details[0].message);
        // checking the user is already exists
         const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send('Email already exists');
    }else{
        if(!(regex1.test(req.body.mobile_no) || regex2.test(req.body.mobile_no))) return res.status(400).send("Invalid phone number");
         // checking the user is already exists
         const userExists = await User.findOne({mobile_no: req.body.mobile_no});
        if(userExists) return res.status(400).send('Phone number already exists');
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   // create new user
       const user = new User({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           email: req.body.email,
           mobile_no: req.body.mobile_no,
           password: hashedPassword
       });
       try{
            const savedUser = await user.save();
            res.send({ user : user._id});
       }catch(err){
           res.status(400).send(err);
       }
   };
   
   
   //LOGIN
   exports.login = async (req, res) => {
   // validation the data
  if(req.body.mobile_no == null){
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
   }else{
       // check mobile number exists
    const user = await User.findOne({mobile_no: req.body.mobile_no});
    if(!user) return res.status(400).send('Mobile number is not found');
    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    //create token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{ expiresIn:1440 })
    res.header('auth-token',token).send(token);
    console.log("logged In");
   }
   
   }
   

   