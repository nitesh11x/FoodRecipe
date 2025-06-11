import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import FetchRecipeById from './FetchRecipeById'


const Saved = () => {
  const { savedRecipe } = useContext(AppContext)

  return (
    <main>
     {
      savedRecipe?.map((data)=>( <FetchRecipeById key={ data.recipe} id={data.recipe} /> )
     )}
    </main>
  )
}

export default Saved
