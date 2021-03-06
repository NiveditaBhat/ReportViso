
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = (req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(
    hash => {
   const  user = new User({
       email: req.body.email,
       password: hash
     });
     user.save().then(
       (response) => {
         res.status(201).json({
           message: 'User Account Created',
          user: response
       });
       }
     ).catch(
       (err) => {
         res.status(500).json({
           message : 'Account Creation failed'
         });
       }
     );
    }
  );
 }

 exports.authenticateUser = (req,res,next)=>{
  let fetchedUser;
let email;
if(req.query.guest == 'true') {
  email = 'neetu@home.com';
}
else {
  email = req.body.email;
}

  User.findOne({email:email}).then(
   (userDetails) => {
     if(!userDetails)
     {
   return res.status(401).json({
        message:'User email not found'
      });
     }
fetchedUser = userDetails;
if(req.query.guest == 'true') {
  return true;
}
else {
return bcrypt.compare(req.body.password,userDetails.password);
}
    }
  ).
  then(
    (isPwdMatch) => {

      if(!isPwdMatch){
       return res.status(401).json({
          message:'User pwd mismatch',
        });
      }
const token = jwt.sign( { email: fetchedUser.email, userId: fetchedUser._id },
  process.env.JWT_KEY,
  { expiresIn: "1h" });

 res.status(200).json({
    message:'User Authenticated',
    token:token,
    expiresIn:3600,
    userId:fetchedUser._id
  });
    }
  )
  .catch(
    (err) => {
     return res.status(401).json({
        error:err
      });
    }
  )
}
