import axios from "axios"

export const signupUser = ({ username, password, email, confirmPassword, confirmEmail }) => {
        axios({
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email,
                confirmPassword: confirmPassword,
                confirmEmail: confirmEmail
            },
            withCredentials: true,
            url: 'http://localhost:3005/auth/signup'
        })
        .then(res => {
            console.log(res.data, res)
            return res.data
        })
        .catch(err => console.log(err))
    }

export const loginUser = ({ username, password }) => {
        axios({
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            withCredentials: true,
            url: 'http://localhost:3005/auth/login'
        })
        .then(res => console.log(res.data.json()))
        .catch(err => console.log(err))
    }

