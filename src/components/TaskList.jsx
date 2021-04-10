import React, {useState} from 'react'
import uniqid from 'uniqid'

const TaskList = () => {
    
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [id, setId] = useState('')
    const [error, setError] = useState(null);

    const addTask = (e) => {
        e.preventDefault()

        if(!task.trim()){
            setError('TASK IS EMPTY');
            return
        }
        // New object with uniq ID
        const newTask = {
            id:uniqid(), // Genero un ID unico
            taskTitle:task
        }
        // Add every task to an a object
        setTaskList([...taskList, newTask]);
        setTask ('');
        setError(null);
    }

    // Delete task
    const deleteTask = (id) => {
        const newArray = taskList.filter( item => item.id !== id);
        setTaskList (newArray);
    }

    // Edit task
    const[edit, setEdit] = useState(false); // (false) Porque cuando entramos a la pagina no estamos en modo edit

    const editT = (item) => {
        setEdit(true); // Cambia a true cuando entra el nuevo componente
        setTask(item.taskTitle); // Lo que queremos editar
        setId(item.id);
    }

    const editTask = (e) => {
        e.preventDefault();
        const newArray = taskList.map(item => item.id === id ? {id:id, taskTitle:task}: item);
        setTaskList(newArray)
        setEdit(false); //False porque cuando terminamos de editar, vuelve a registro
        setTask('');
    }

    return (
        <div>
            <h2>To-Do List</h2> 
            <div className= "">
                    <h3>Add task</h3>
                    <form onSubmit= {edit ? editTask : addTask} className= "">
                        <input 
                            onChange={(e) => {setTask(e.target.value)}} 
                            className= "form-control mb-3" 
                            type= "text" 
                            placeholder= "New task"
                            value= {task} // Esto es para que cuando ingreso un nombre y apreto registrar, se borra del input
                        />
                        
                        <input 
                            className= "btn btn-info btn-block mb-4" 
                            type= "submit" 
                            value= {edit ? (`Edit ${task}`) : 'Add'}
                        />
                    </form>
                    {
                        error != null ? (
                            <div className= "alert alert-danger">
                                {error}
                            </div>
                        ):(
                            <div></div>
                        )
                    }
                </div>

            <div className= "row">
                <div className= "col">
                    <ul className= "list-group">
                        {
                            taskList.map(item => 
                                <li key="{item.id}" className= "list-group-item">{item.taskTitle}
                                    <button
                                        onClick={() => {deleteTask(item.id)}} 
                                        className= 'btn btn-danger float-right'>
                                            DELETE
                                    </button>

                                    <button 
                                        onClick={() => {editT(item)}}
                                        className= 'btn btn-info float-right mr-1'>
                                            EDIT
                                    </button>
                                </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TaskList;


