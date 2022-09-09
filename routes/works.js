import { Router } from "express"
import { createWork, getAll } from "../controllers/works.js"
import { checkRole } from '../utils/checkRole.js'

const router = new Router()

router.post('/', checkRole('ADMIN'), createWork)

router.get('/', getAll)

export default router