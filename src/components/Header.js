import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = ({ title, onClick, showAdd }) => {
	
	const { pathname } = useLocation()

    return(
    	<header className='header'>
			<h1>{title}</h1>
    	  	{ pathname === '/myTasks' && <Button 
    			color={ showAdd ? '#F76C5E' : '#2A9D8F' } 
				onClick={onClick} 
				text={ showAdd ? '' : 'Add' }
    	  	/>}
    	</header>
    )
}

Header.defaultProps = {
	title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header