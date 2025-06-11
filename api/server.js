import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import userRouter from './routes/user.js'
import recipeRouter from './routes/recipe.js'
import cors from 'cors'

const app = express()

// Load env variables
dotenv.config()

// Middleware to parse JSON
app.use(express.json())

// Middleware to Cors
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

// Prefix user routes
app.use('/api', userRouter)

// Prefix user routes
app.use('/api', recipeRouter)

// Connect the database
connectDB()

// Start server
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
