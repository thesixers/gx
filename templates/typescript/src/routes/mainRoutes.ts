import { Router } from "express"
import { homePage } from "../controllers/mainController"


const router = Router()

router.get("/", homePage)

export default router
