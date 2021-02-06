const express = require("express");

const router = express.Router();

const AuthController = require('../controllers/auth');

router.get('/login', AuthController.getLogin);
router.get('/signup', AuthController.getSignUp);

router.post('/login', AuthController.postLogin);
router.post('/signup', AuthController.postSignUp);

router.post('/logout', AuthController.postLogout);

module.exports = router;