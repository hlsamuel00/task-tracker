import passport from 'passport'
import validator from 'validator'
import User from '../models/User.js'

export default {
    postLogin: (req,res) => {
        const validationErrors = { success: [], errors: [] }
        if(req.user){
            validationErrors.errors.push('User already logged in.')
        }
        if(validator.isEmpty(req.body.password)){
            validationErrors.errors.push( 'Password cannot be blank.')
        }
        if(validationErrors.errors.length){
            return res.status(500).send({ errors: validationErrors.errors })
        }

        passport.authenticate('local', (err, user, info) => {
            if(err){
                return res.send(err)
            }
            if(!user){
                return res.send(info)
            }
            req.login(user, err => {

                if(err){
                    return res.send(err)
                }
                console.log(user)
                return res.status(200).send(user)
            })
        })
    },
    postSignup: async (req,res,next) => {
        console.log(req.user)
        
        // const validationErrors = { success: [], errors: [] }
        // const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,}$/g

        // // Validation Conditionals
        // if(!validator.isEmail(req.body.email)){
        //     validationErrors.errors.push('Please enter a valid email address.')
        // }
        // if(!validator.isLength(req.body.password, { min: 8, max: 16 })){
        //     validationErrors.errors.push('Please enter a password between 8 and 16 characters.')
        // }
        // if(validator.contains(req.body.password, 'password')){
        //     validationErrors.errors.push("Password cannot contain the word 'password'.")
        // }
        // if(!passwordValidation.test(req.body.password)){
        //     validationErrors.errors.push("Password must contain one number (0-9) and one special character (#?!@$ %^&*-).")
        // }
        // if(req.body.password !== req.body.confirmPassword){
        //     validationErrors.errors.push('Passwords do not match.')
        // }
        // if(req.body.email !== req.body.confirmEmail){
        //     validationErrors.errors.push('Email addresses provided do not match.')
        // }
        // if(validationErrors.errors.length){
        //     console.log(validationErrors.errors)
        //     return res.send({ errors: validationErrors.errors })
        // }
        
        console.log(req.body)
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        User.findOne(
            { $or: [{ email: req.body.email }, { username: req.body.username }] },
            (err,existingUser) => {
                if(err){
                    return next(err)
                }
                if(existingUser){
                    console.log("Account with that email address or username already exists.")
                    return res.send({ error: "Account with that email address or username already exists."})
                }
                console.log(user, 'Line 84')

                user.save((error) => {
                    console.log(error, 'Line 87')
                    if(error){
                        console.log(error, 'Line 89')
                        return next(error)
                    }
                    req.login(user, (error) => {
                        if(error){
                            console.log(error, 'Line 94')
                            return next(error)
                        }
                        console.log('Account created!')
                        res.status(200).send(user)
                    })
                })
            }
        )
        console.log('Line 103')
    },
    logoutUser: (req,res) => {

    }
}