import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]

    const [tasks, setTasks] = useState(tasks1)

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist :Array<TaskType> = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                date={'30/01/2024'}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
