import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const tasks1: Array<TaskType> = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]

    const [tasks, setTasks] = useState(tasks1)

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (taskTitle:string) => {
        const task = {id: v1(), title: taskTitle, isDone: false}
        setTasks([task, ...tasks])
    }
    const changeStatusTask = (taskId: string, isDone: boolean) => {
        const changedStatus = tasks.map(t => t.id === taskId ? {...t, isDone: isDone}: t)
        setTasks(changedStatus)
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
                addTask={addTask}
                changeStatusTask={changeStatusTask}
                filter={filter}
            />
        </div>
    )
}

export default App;
