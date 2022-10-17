import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle }) => {
    return(
        <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                <FaTrashAlt
                    style={{ color: '#BB0A21', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)} 
                />
            </h3>
            <p>{task.day}</p>
            <p className='link'><Link to={`/task/${task.id}`}>View Details</Link></p>
        </div>
    )
}

export default Task