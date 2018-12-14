const express = require('express');
const router = express.Router();

const userController = require('../controller/user')

router.post('/api/user/signup',userController.createUser);

router.post('/api/user/login',userController.authenticateUser);



module.exports = router;
