import { Recipe } from '../models/Recipe.js'
import { SavedRecipe } from '../models/SavedRecipe.js'

// get saved Recipe
export const getSavedRecipe = async (req, res) => {
  const recipe = await SavedRecipe.find()
  res.json({ recipe })
}

// add Recipe
export const add = async (req, res) => {
  const { title, ist, ing1, ing2, ing3, ing4, qty, imgUrl } = req.body

  try {
    const recipe = await Recipe.create({
      title,
      ist,
      ing1,
      ing2,
      ing3,
      ing4,
      qty,
      imgUrl,
      user: req.user
    })
    res.json({ message: 'Recipe Created Successfully', success: true, recipe })
  } catch (error) {
    res.json({ message: error })
  }
}

// export const add = async (req, res) => {
//   const { title, description, ing, ins, qty, imgUrl } = req.body

//   try {
//     const recipe = await Recipe.create({
//       title,
//       description,
//       ing,
//       ins,
//       imgUrl,
//       user: '683c7cf7401d58e276ab248e'
//     })
//     res.json({ message: 'Recipe Created Successfully', success: true, recipe })
//   } catch (error) {
//     res.json({ message: error })
//   }
// }

// get recipe
export const getAllRecipe = async (req, res) => {
  const recipe = await Recipe.find()
  res.json({ recipe })
}

// get Recipe By id
export const getRecipeById = async (req, res) => {
  const id = req.params.id

  try {
    let recipe = await Recipe.findById(id)

    if (!recipe) res.json({ message: 'recipe not exist' })

    res.json({ message: 'Recipe By id', recipe })
  } catch (error) {
    res.json({ message: error })
  }
}

// Get recipe(s) by user ID
export const getRecipeByUserId = async (req, res) => {
  const userId = req.params.id

  try {
    const recipes = await Recipe.find({ user: userId }) // Filter by user field

    if (!recipes || recipes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No recipes found for this user.' })
    }

    res.json({ message: 'Recipes by user ID', recipes })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// save recipe
export const savedRecipeById = async (req, res) => {
  const id = req.params.id

  let recipe = await SavedRecipe.findOne({ recipe: id })
  if (recipe) return res.json({ message: 'recipe already saved' })

  recipe = await SavedRecipe.create({ recipe: id })
  res.json({ message: 'recipe saved Successfully', success: true })
}
