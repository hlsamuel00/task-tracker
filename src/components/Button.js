import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'


const Button = ({ color, text, onClick }) => {
    return (
        <button 
          style={{ backgroundColor: color }}
          onClick={onClick} 
          className="btn"
        >
            {text ? text : <FaTimes />}
        </button>
    )
}

Button.defaultProps = {

    color: '#BB0A21'
}

Button.propType = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button