import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const FetchRecipeById = ({ id }) => {
  const { getRecipeById } = useContext(AppContext)
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await getRecipeById(id)
        setRecipe(result.data.recipe)
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    fetchRecipe()
  }, [id, getRecipeById])

  return (
    <main className="container py-5">
      {recipe ? (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Image */}
              {recipe.imgUrl && (
                <img
                  src={recipe.imgUrl}
                  alt={recipe.title}
                  className="w-100"
                  style={{ height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
                />
              )}

              {/* Content */}
              <div className="card-body p-4">
                <h2 className="card-title mb-3 text-center">{recipe.title}</h2>

                {/* Instructions */}
                <h5 className="mt-4">Instructions</h5>
                <p className="text-muted">{recipe.ist}</p>

                {/* Ingredients */}
                <h5 className="mt-4">Ingredients</h5>
                <ul className="list-group mb-3">
                  {recipe.ing1 && (
                    <li className="list-group-item d-flex justify-content-between">
                      <span>{recipe.ing1}</span>
                      {recipe.qty1 && <span className="text-muted">{recipe.qty1}</span>}
                    </li>
                  )}
                  {recipe.ing2 && <li className="list-group-item">{recipe.ing2}</li>}
                  {recipe.ing3 && <li className="list-group-item">{recipe.ing3}</li>}
                  {recipe.ing4 && <li className="list-group-item">{recipe.ing4}</li>}
                </ul>

                {/* Back Button */}
                <div className="text-center">
                  <button
                    className="btn btn-outline-warning mt-3 text-black"
                    onClick={() => navigate('/')}
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading recipe...</p>
        </div>
      )}
    </main>
  )
}

export default FetchRecipeById
