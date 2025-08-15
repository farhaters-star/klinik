import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth-midddleware.js"
import { updateProfile,checkAuth } from "../controllers/auth.controller.js"


const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


router.put("/updateProfile",protectRoute,updateProfile)

router.get("/check",protectRoute, checkAuth)

export default router