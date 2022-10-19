import express from "express";
const router = express.Router()
import authController from '../controllers/auth.js'

// @description     Login User
// @route           POST /auth/login
router.post('/login', authController.postLogin)

// @description     SingUp User
// @route           POST /auth/signup
router.post('/signup', authController.postSignup)

export default router