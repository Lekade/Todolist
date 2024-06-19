import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";

export type TodoListType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}
export type TaskObjType = {
    [todolistId: string] : TaskType[]
}


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [toDoLists, setToDoLists] = useState<TodoListType[]>([
        {todoListId:  todoListId1, title: 'what to learn', filter: 'all'},
        {todoListId: todoListId2, title: 'what to bay', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskObjType>({
        [todoListId1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},
            {taskId: v1(), title: 'Typescript', isDone: false},
            {taskId: v1(), title: 'RTK query', isDone: false},
        ],
        [todoListId2]: [
            {taskId: v1(), title: 'Milk', isDone: false},
            {taskId: v1(), title: 'Water', isDone: false},
            {taskId: v1(), title: 'Chips', isDone: true},
        ]
    })


    const addTask = (taskTitle:string, todoListId: string) => {
        const newTask : TaskType = {taskId: v1(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.taskId !== taskId)})
    }

    const changeStatusTask = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.taskId === taskId ? {...t, isDone: isDone}: t)})
    }
    const changeTaskFilter = (filter: FilterValuesType, todoListId: string) => {
        setToDoLists(toDoLists.map(tl  => tl.todoListId === todoListId ? {...tl, filter: filter} : tl))
    }

    // const [filter, setFilter] = useState<FilterValuesType>('all')
    //



    return (
        <div className="App">
            {toDoLists.map(tl => {
                let tasksForTodolist :Array<TaskType> = tasks[tl.todoListId]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.todoListId].filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.todoListId].filter(task => task.isDone)
                }

                return (
                    <Todolist

                        key={tl.todoListId}
                        todoListId={tl.todoListId}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeTaskFilter={changeTaskFilter}
                        addTask={addTask}
                        changeStatusTask={changeStatusTask}
                        filter={tl.filter}
                    />
                )
                })}

        </div>
    )
}

export default App;
