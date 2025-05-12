import { useEffect, useState } from "react";

export default function TodoList() {

    //local storage
    function getStoredTodos() {
        let data = localStorage.getItem("todos")
        let json = JSON.parse(data)
        if (json) {
            return json
        } return []
    
    }



    // create the array > now check storage
    const [todos, setTodos] = useState(getStoredTodos())

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])


    function handleSubmit(event) {
        event.preventDefault()

        let task = event.target.task.value;

        if (!task) {
            alert("please provide a valid task")
            return
        }

        setTodos([...todos, { task: task, completed: false}])

        event.target.reset()
    }

    function changeTaskStatus(index) {
        let newTodos = [...todos]
        newTodos[index].completed = !newTodos[index].completed
        setTodos(newTodos)
    }

    function deleteTask(index) {
        let newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    return (
        <div className="container my-5">
            <div className="mx-auto rounded border p-4" 
                style={{width: "600px", backgroundColor: "#ECEFF2"}}>

                    <h2 className="text-black text-center mb-5">Simple todo list</h2>

                    <form className="d-flex mb-2" onSubmit={handleSubmit}>
                        <input className="form-control me-2" placeholder="write a new to do" name="task" />
                        <button className="btn btn-outline-primary" type="submit">Add</button>
                    </form>

                    {
                        todos.map((todo, index) => {
                            return (
                                <div key={index} 
                                    className="rounded mt-a p-2 mb-2 d-flex" 
                                    style={{backgroundColor: todo.completed ? "#C3DFCD" : "white"}}>
                                        <div> 
                                            <i className={ "h5 me-2 " + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} 
                                                style={{ cursor: "pointer"}} onClick={() => changeTaskStatus(index)}></i> 
                                            </div>
                                        <div className="me-auto">
                                            {todo.task}
                                        </div>
                                        <div>
                                             <i className="bi bi-x text-danger h5" 
                                             style={{ cursor: "pointer"}} onClick={() => deleteTask(index)}></i> 
                                        </div>

                                </div>
                            )
                        })
                    }

            </div>
        </div>
    )
} 