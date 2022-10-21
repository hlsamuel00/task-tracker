import express from 'express'
const app = express()
import passport from 'passport'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passportConfig from './config/passport.js'
import flash from 'flash'
import logger from 'morgan'
import session from 'express-session'
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo(session)
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/task.js'
// End of Variable Assignments ================================================



// Dotenv middleware configuration
dotenv.config({ path: './config/config.env' })

// Passport middleware configuration
passportConfig(passport)

// Database Connection
connectDB()

// Body Parser middleware Configuration
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logger middleware configuration
logger.token('body', (req) => JSON.stringify(req.body))
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))

// Session middleware
app.use(
    session({
      secret: "astronaut unicorn princess",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
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

// Flash Message middleware configuration
app.use(flash())

// End of Middleware Config ================================================


// Route configuration
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

// End of Route Config ================================================


// Listener Configuration
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}; you better go catch it!!`)
})