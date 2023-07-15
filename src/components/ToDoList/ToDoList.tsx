import { FormEvent, useState } from "react"
import classes from './ToDoList.module.css'
import TaskList from "../TaskList/TaskList"

const ToDoList = () => {
    const [newTaskName, setNewTaskName] = useState("")
    const [taskList, setTaskList] = useState<string[]>([])

    const addTask = () => {
        setTaskList([...taskList, newTaskName])
        setNewTaskName("")
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        addTask()
    }

    const onRemoveTask = (index: number) => {
        setTaskList([...taskList.slice(0, index), ...taskList.slice(index+1)])
    }


    return (
        <>
            <form className={classes['task-form']} onSubmit={handleSubmit}>
                <input value={newTaskName} onChange={(event) => setNewTaskName(event.target.value)} />
                <input type="submit" value="add task" />
            </form>
            <TaskList tasks={taskList} onRemoveTask={onRemoveTask}/>
        </>
    )
}

export default ToDoList