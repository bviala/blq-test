import classes from './Main.module.css'
import ToDoList from '../ToDoList/ToDoList'

const Main = () => {
    return (
        <main className={classes.main}>
            <ToDoList />
        </main>
    )
}

export default Main