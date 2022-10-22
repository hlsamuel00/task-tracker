import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User.js'

export default function(passport){
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username.toLocaleLowerCase() }, (err,user) =>{
                console.log('here is the issue')
                if(err){
                    console.log("no it's right here")
                    return done(err)
                }
                if(!user){
                    console.log('noooooo here it is')
                    return done(null, false, { message: `Username ${username} not found` })
                }
                if(!user.password){
                    return done(null, false, {
                        message: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
                    })
                }
                user.comparePassword(password, (err,isMatch) => {
                    if(err){
                        console.log('here')
                        return done(err)
                    }
                    if(isMatch){
                        console.log('no here')
                        return done(null, user)
                    }
                    return done(null, false, { message: 'Invalid username or password.'})
                })
            })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            const userInformation = {
                username: user.username
            }
            done(err, userInformation)
        });
    })
}
