import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import passportConfig from './config/passport.js'
import flash from 'flash'
import logger from 'morgan'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/task.js'

const app = express()

// Logger configuration
logger.token('body', (req) => JSON.stringify(req.body))

// Dotenv Configuration
dotenv.config({ path: './config/config.env' })

// Passport Configuration
passportConfig(passport)

// Database Connection
connectDB()

// Middleware ===============
// Body Parser Configuration
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session middleware
app.use(
    session({
      secret: "astronaut unicorn princess",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ client: mongoose.connection, collectionName: 'sessions' }),
    })
)

// Cors middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// Cookie parser middleware
app.use(cookieParser('astronaut unicorn princess'))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash Message Configuration
app.use(flash())

// Route configuration
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

// Listener Configuration
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}; you better go catch it!!`)
})