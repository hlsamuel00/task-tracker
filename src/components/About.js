import { Link } from "react-router-dom"
import Button from "./Button"

const About = () => {

    return(
        <div className="about">
            <h4>Version 1.0.0</h4>
            <p>This is a simple task tracker web application developed with React</p>
            <Link to='/'><Button text='Go Back' color='#2A9D8F'/></Link>
        </div>
    )
}

export default About