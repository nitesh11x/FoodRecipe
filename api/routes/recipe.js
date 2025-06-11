import express from 'express'
import {
  add,
  getAllRecipe,
  getRecipeById,
  getRecipeByUserId,
  getSavedRecipe,
  savedRecipeById
} from '../controllers/recipe.js'
import { Authenticate } from '../middlewares/auth.js'

const router = express.Router()

// create recipe
// http://localhost:3000/api/add        >>>>>>>>>>>>>>>>>>>   Post
router.post('/add', Authenticate, add)

// get all saved recipe
// http://localhost:3000/saved          >>>>>>>>>>>>>>>>>>>   Get
router.get('/saved', getSavedRecipe)

// get all Recipe
// http://localhost:3000/api/get        >>>>>>>>>>>>>>>>>>>   Get
router.get('/', getAllRecipe)

// get Specific recipe by id
// http://localhost:3000/api/:id        >>>>>>>>>>>>>>>>>>>   Get
router.get('/:id', getRecipeById)

// get recipe by user id
// http://localhost:3000/api/user:id    >>>>>>>>>>>>>>>>>>>   Get
router.get('/user/:id', getRecipeByUserId)

// save recipe by id
// http://localhost:3000/api/:id        >>>>>>>>>>>>>>>>>>>   post
router.post('/:id', Authenticate, savedRecipeById)

export default router
