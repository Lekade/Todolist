import React, {useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {Header} from "./components/header/Header";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from "@mui/material";
import {
    AddTodolistAC
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/Store";

export type TodoListType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type ThemeMode = 'dark' | 'light'

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log('render App')
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addToDOList = useCallback( (titleTodoList: string) => {
        const newTodoListId = v1()
        dispatch(AddTodolistAC(newTodoListId, titleTodoList))
    }, [dispatch])

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#0FC0FC',
            },
        },
    })

    const changeModeHandler = useCallback( () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }, [themeMode])

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>
                    <Header changeModeHandler={changeModeHandler}/>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addToDOList}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(tl => {
                            return (
                                <Grid item key={tl.todolistId}>
                                    <Paper elevation={6} sx={{p: '30px'}}>
                                        <Todolist
                                            todolist={tl}
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
