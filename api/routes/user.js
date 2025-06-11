import express from 'express'
import { register, login, profile } from '../controllers/user.js'
import { Authenticate } from '../middlewares/auth.js'

const router = express.Router()

// register route
// http://localhost:3000/api/register  >>>>>>>>>>>>>>> User register Route
router.post('/register', register)

// login route
// http://localhost:3000/api/login  >>>>>>>>>>>>>>> User register Route
router.post('/login', login)

// usr profile
// http://localhost:3000/api/user  >>>>>>>>>>>>>>> user profile route
router.get('/user', Authenticate, profile)

export default router
