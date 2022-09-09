import { Router } from "express"
import { createPost, getAll, getPostById } from "../controllers/posts.js"
import { checkRole } from '../utils/checkRole.js'

const router = new Router()

router.post('/', checkRole('ADMIN'), createPost)

router.get('/', getAll)

router.get('/:id', getPostById)

export default router