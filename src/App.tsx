import React, {useState} from 'react';
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
} from "./store/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/Store";

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

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTask = (taskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(todoListId, taskTitle))

    }
    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const changeStatusTask = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (newTaskTitle: string, taskId: string, todoListId: string) => {
        dispatch(changeTitleTaskAC(newTaskTitle, taskId, todoListId))

    }
    const changeTaskFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, filter))
    }
    const removeToDoList = (todoListId: string) => {
        dispatch(RemoveTodolistAC(todoListId))
    }
    const addToDOList = (titleTodoList: string) => {
        const newTodoListId = v1()
        dispatch(AddTodolistAC(newTodoListId, titleTodoList))
    }
    const changeToDoListTitle = (newToDoListTitle: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, newToDoListTitle))
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
                        {todolists.map(tl => {
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

export default App;
