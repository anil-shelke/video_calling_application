import express from "express";
import {signup, login, logout, onboard} from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get('/signup', (req, res) =>{
//     res.send("signup")
// })

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/onboarding', protectRoute ,onboard)

// todo 
// forgot-password
// reset-password

router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({message: true, user: req.user});
})

export default router