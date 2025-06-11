import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import FetchRecipeById from './FetchRecipeById'

const Detail = () => {

  const { id } = useParams()
  return (
    <main>
      <FetchRecipeById id={id} />
    </main>
  )
}

export default Detail
