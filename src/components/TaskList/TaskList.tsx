const TaskList = ({tasks, onRemoveTask}: {tasks: string[], onRemoveTask: (index: number) => void}) => {
    return (
        <>
            {tasks.map((task, index) => (
                <div key={index}>
                    <p>{task}</p>
                    <button onClick={() => onRemoveTask(index)}>remove task</button>
                </div>
            ))}
        </>
    )
}

export default TaskList