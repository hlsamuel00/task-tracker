import axios from "axios";

export default {
    signupUser: ({ username, password, email }) => {
        axios({
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email
            },
            withCredentials: true,
            url: 'http://localhost:3005/signup'
        })
        .then(res => console.log(res.json()))
    },
    loginUser: ({ username, password }) => {
        axios({
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            withCredentials: true,
            url: 'http://localhost:3005/login'
        })
        .then(res => console.log(res.json()))
    }
}