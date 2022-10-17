import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer>
            <p>Copywright &copy;2022 | <a href="https://abeardeddev.me">A Bearded Dev</a></p>
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer