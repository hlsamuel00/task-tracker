import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import passportConfig from './config/passport'
import flash from 'flash'
import logger from 'morgan'

logger.token()

const app = express()

// Dotenv Configuration
dotenv.config({ path: './config/config.env' })

// Passport Configuration
passportConfig(passport)

// Body Parser Configuration
app.use(express.json())



// 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}; you better go catch it!!`)
})