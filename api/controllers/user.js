import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'

// register user
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.json({ message: 'user already exists' })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashPassword, phone })
    res.json({ message: 'user register successfully... ', user })
  } catch (error) {
    res.json({ message: error })
  }
}

// login user
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.json({ message: 'user not exists ' })
    }
    const validpassword = await bcrypt.compare(password, user.password)

    if (!validpassword) {
      return res.json({ message: 'invalid Password' })
    }

    const token = jwt.sign({ userId: user._id }, '#$@#%', { expiresIn: '30d' })

    res.json({ message: `welcome ${user.name}`, token })
  } catch (error) {
    res.json({ message: error })
  }
}

export const profile = async (req, res) => {
  res.json({ user: req.user })
}
