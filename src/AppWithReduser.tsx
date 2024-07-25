import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/addItemForm/addItemForm";
import {Header} from "./components/header/Header";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

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

type ThemeMode = 'dark' | 'light'

export type TaskObjType = {
    [todolistId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReduser() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todolistsState, dispatchToTodolist] = useReducer(todolistsReducer, [
        {todoListId: todoListId1, title: 'what to learn', filter: 'all'},
        {todoListId: todoListId2, title: 'what to bay', filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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


    const addTask = (taskTitle: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(todoListId, taskTitle))

    }
    const removeTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }
    const changeStatusTask = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeStatusTaskAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (newTaskTitle: string, taskId: string, todoListId: string) => {
        dispatchToTasks(changeTitleTaskAC(newTaskTitle, taskId, todoListId))

    }
    const changeTaskFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistFilterAC(todoListId, filter))
    }
    const removeToDoList = (todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const addToDOList = (titleTodoList: string) => {
        const newTodoListId = v1()
        const action = AddTodolistAC(newTodoListId, titleTodoList)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const changeToDoListTitle = (newToDoListTitle: string, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistTitleAC(todoListId, newToDoListTitle))
    }


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#0FC0FC',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>
                    <Header changeModeHandler={changeModeHandler}/>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={(itemTitle) => addToDOList(itemTitle)}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistsState.map(tl => {
                            let tasksForTodolist: Array<TaskType> = tasks[tl.todoListId]
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks[tl.todoListId].filter(task => !task.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasks[tl.todoListId].filter(task => task.isDone)
                            }
                            return (
                                <Grid item key={tl.todoListId}>
                                    <Paper elevation={6} sx={{p: '30px'}}>
                                        <Todolist
                                            todoListId={tl.todoListId}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeTaskFilter={changeTaskFilter}
                                            addTask={addTask}
                                            changeStatusTask={changeStatusTask}
                                            filter={tl.filter}
                                            removeToDoList={removeToDoList}
                                            changeToDoListTitle={changeToDoListTitle}
                                            changeTaskTitle={changeTaskTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AppWithReduser;
