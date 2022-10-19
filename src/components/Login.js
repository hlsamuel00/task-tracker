import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import { signupUser, loginUser } from '../api-functions/functions'

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ confirmEmail, setConfirmEmail ] = useState('')
    const [ loginDisplay, setLoginDisplay ] = useState(true)

    const loginSubmit = () => {
        loginUser({
            username: username,
            password: password
        })
    }
    
    return (
        <div className="login-container">
            <div className="button-container">
                <Button 
                    onClick={() => setLoginDisplay(true)} 
                    color={loginDisplay ? '#E3EEF2' : '#A5AEB1'} 
                    text='Login'
                />
                <Button 
                    onClick={() => setLoginDisplay(false)} 
                    color={loginDisplay ? '#A5AEB1' : '#E3EEF2'} 
                    text='Signup'
                />
            </div>
            <div className="form-container">

                { loginDisplay ? (
                    <form className="login-form">
                        <div className="form-control">
                            <label>Username</label>
                            <input 
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <input type='submit' onSubmit={loginSubmit} value='Login to My Account' className="btn btn-block" />
                        <Link to=''><p>Forgot my password</p></Link>
                    </form>
                ) : (
                    <form className="login-form">
                        <div className="form-control">
                            <label>Username</label>
                            <input 
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Email Address</label>
                            <input 
                                type='text'
                                placeholder='Enter email address'
                                value={email}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Confirm Email Address</label>
                            <input 
                                type='text'
                                placeholder='Re-enter email address'
                                value={confirmEmail}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Confirm Password</label>
                            <input
                                type='password'
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <input type='submit' value='Create New Account' className="btn btn-block" />
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login