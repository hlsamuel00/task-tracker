import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import axios from 'axios';
import Header from './components/Header'
import Login from './components/Login';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import TaskDetails from './components/TaskDetails';

function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])
	const [ loading, setLoading ] = useState(true)

	useEffect(() => {
		const getTasks = async () => {
			setTasks(await fetchTasks())
			setLoading(false)
		}
		getTasks()
	}, [])

	//Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:8005/tasks')
		const data = await res.json()
		return data
	}

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:8000/tasks/${id}`)
		const data = await res.json()
		return data
	}

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:8000/tasks', { 
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(task)
		})
		const data = await res.json()
		setTasks([...tasks, data])
	}

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE'})
		setTasks(tasks.filter(task => task.id !== id))
	}

	// Toggle Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

		const res = await fetch(`http://localhost:8000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(updatedTask)
		})
		const data = await res.json()

		setTasks(tasks.map(task => task.id === id ? data : task))
	}

  return (
	<div className="container">
		<Header onClick={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/myTasks' 
				element={ loading ? <h3>Loading...</h3> :
					<>
						{showAddTask && <AddTask onAdd={addTask}/>}
						{tasks.length ? 
							(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) 
							: ('Currently, you have no tasks to show.')
						}
					</>
				} 
			/>
			<Route path='/about' element={<About />} />
			<Route path='/task/:id' element={<TaskDetails />} />
		</Routes>
		< Footer />
	</div>
  );
}

export default App;
