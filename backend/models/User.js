import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function save(next){
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(16, (err, salt) => {
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

// Helper method for comparing password
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err,isMatch) => {
        cb(err, isMatch)
    })
}

export default model('User', UserSchema)