import passport from 'passport'
import validator from 'validator'
import User from '../models/User.js'

export default {
    postLogin: (req,res) => {
        const validationErrors = { success: [], errors: [] }
        if(!validator.isEmail(req.body.email)){
            validationErrors.errors.push( { msg: 'Please enter a valid email address.'})
        }
        if(validator.isEmpty(req.body.password)){
            validationErrors.errors.push( { msg: 'Password cannot be blank.' })
        }
        if(validationErrors.errors.length){
            res.status(500).send({ errors: validationErrors.errors })
        }

        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
        passport.authenticate('local', (err, user, info) => {
            if(err){
                throw err
            }
            if(!user){
                res.send('No user exists.')
            }
            req.login(user, err => {
                if(err){
                    throw err
                }
                res.send('Successfully logged in!')
                console.log(req.user)
            })
        })
    },
    postSignup: async (req,res) => {
        const validationErrors = { success: [], errors: [] }
        const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,}$/g

        // Validation Conditionals
        if(!validator.isEmail(req.body.email)){
            validationErrors.errors.push('Please enter a valid email address.')
        }
        if(!validator.isLength(req.body.password, { min: 8, max: 16 })){
            validationErrors.errors.push('Please enter a password between 8 and 16 characters.')
        }
        if(validator.contains(req.body.password, 'password')){
            validationErrors.errors.push("Password cannot contain the word 'password'.")
        }
        if(!passwordValidation.test(req.body.password)){
            validationErrors.errors.push("Password must contain one number (0-9) and one special character (#?!@$ %^&*-).")
        }
        if(req.body.password !== req.body.confirmPassword){
            validationErrors.errors.push('Passwords do not match.')
        }
        if(validationErrors.errors.length){
            console.log(validationErrors.errors)
            res.status(500).send({ errors: validationErrors.errors })
        }
        
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        User.findOne(
            { $or: [{ email: req.body.email }, { username: req.body.username }]},
            (err,existingUser) => {
                if(err){
                    res.send({ errors: err.message })
                }
                if(existingUser){
                    res.send({ errors: "Account with that email address or username already exists." })
                }
                user.save((error) => {
                    if(error){
                        res.send({ errors: error })
                    }
                    req.login(user, (error) => {
                        if(error){
                            res.send({ errors: error })
                        }
                        res.status(200).send({ done: true })
                    })
                })
            }
        )
    }
}