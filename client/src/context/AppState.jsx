import React, { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import axios from 'axios'

const AppState = ({ children }) => {
  const url = 'http://localhost:3000/api'

  const [token, setToken] = useState('')
  const [recipe, setRecipe] = useState([])
  const [savedRecipe, setSavedRecipe] = useState([])
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load token from localStorage on mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
      setIsAuthenticated(true)  // FIXED: use setIsAuthenticated, not isAuthenticated(true)
    }
  }, [])

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // Fetch profile and recipes when token changes and exists
  useEffect(() => {
    if (token) {
      profile()
      fetchRecipe()
      getSavedRecipe()
    } else {
      setUser(null)
      setRecipe([])
      setSavedRecipe([])
      setIsAuthenticated(false)
    }
  }, [token])

  // Fetch all recipes
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${url}/`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      setRecipe(response.data.recipe)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  // Fetch saved recipes
  const getSavedRecipe = async () => {
    try {
      const response = await axios.get(`${url}/saved`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      if (Array.isArray(response.data?.recipe)) {
        setSavedRecipe(response.data.recipe)
      } else {
        setSavedRecipe([])
        console.warn('Unexpected saved recipe format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error)
      setSavedRecipe([])
    }
  }

  // Fetch user profile
  const profile = async () => {
    try {
      const response = await axios.get(`${url}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Auth: token
        },
        withCredentials: true
      })
      setUser(response.data.user)
    } catch (error) {
      console.error(
        'Error fetching user profile:',
        error.response?.data || error.message
      )
      setUser(null)
      setIsAuthenticated(false)
      setToken('')
      localStorage.removeItem('token')
    }
  }

  // Login
  const login = async (email, password) => {
    const response = await axios.post(
      `${url}/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    setToken(response.data.token)
    setIsAuthenticated(true)
    return response
  }

  // Register
  const register = async (name, email, password) => {
    const response = await axios.post(
      `${url}/register`,
      { name, email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    setToken(response.data.token)
    setIsAuthenticated(true)
    return response
  }

  // Add a recipe
  const addRecipe = async (
    title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    imgUrl
  ) => {
    const response = await axios.post(
      `${url}/add`,
      { title, ist, ing1, ing2, ing3, ing4, qty1, imgUrl },
      {
        headers: { 'Content-Type': 'application/json', Auth: token },
        withCredentials: true
      }
    )
    return response
  }

  // Get a recipe by ID
  const getRecipeById = async id => {
    try {
      const response = await axios.get(`${url}/${id}`, {
        headers: { 'Content-Type': 'application/json', Auth: token },
        withCredentials: true
      })
      return response
    } catch (error) {
      console.error('Error fetching recipe by ID:', error)
      throw error
    }
  }

  // Save a recipe by ID
  const saveRecipeById = async id => {
    try {
      const response = await axios.post(
        `${url}/${id}`,
        {},
        {
          headers: { 'Content-Type': 'application/json', Auth: token },
          withCredentials: true
        }
      )
      return response
    } catch (error) {
      console.error('Error saving recipe:', error)
      throw error
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setIsAuthenticated(false)
    setUser(null)
    // setRecipe([])
    setSavedRecipe([])
  }

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        getRecipeById,
        saveRecipeById,
        getSavedRecipe,
        setRecipe,
        recipe,
        savedRecipe,
        user,
        profile,
        isAuthenticated,
        setIsAuthenticated,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppState
