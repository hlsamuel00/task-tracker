import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'

export default function(passport){
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username.toLocaleLowerCase() }, (err,user) =>{
                if(err){
                    return done(err)
                }
                if(!user){
                    return done(null, false, { message: `Username ${username} not found` })
                }
                if(!user.password){
                    return done(null, false, {
                        message: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
                    })
                }
                user.comparePassword(password, (err,isMatch) => {
                    if(err){
                        return done(err)
                    }
                    if(isMatch){
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
        User.findById(id, (err, user) => done(err, user));
    })
}
