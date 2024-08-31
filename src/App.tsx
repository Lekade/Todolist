import React, {useCallback, useEffect, useState} from 'react';
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
    AddTodolistAC, TodolistDomainType
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/Store";
import {todolistsApi} from "./api/todolists-api";


export type ThemeMode = 'dark' | 'light'


function App() {
    console.log('render App')
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
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

    useEffect(()=>{
        // todolistsApi.getTodolist().then(console.log).catch(console.error)
        // todolistsApi.createTodo('Redux').then(response =>  console.log(response.data.data.item)).catch(console.error)
        // todolistsApi.deleteTodo("a0291ef1-7556-479d-b0d8-d95b8c8e08b4").then(console.log).catch(console.error)
        // todolistsApi.updateTodo("35bb7bce-2f3a-4817-9f11-e5ca4e69fd8f", 'Redux thank').then(data => console.log(data.data)).catch(console.error)
        // todolistsApi.getTasks("35bb7bce-2f3a-4817-9f11-e5ca4e69fd8f").then(console.log).catch(console.error)
        // todolistsApi.createTask("35bb7bce-2f3a-4817-9f11-e5ca4e69fd8f", '111').then(console.log).catch(console.error)
        // todolistsApi.deleteTask("35bb7bce-2f3a-4817-9f11-e5ca4e69fd8f","98b1748e-b4aa-49dc-bec1-cdffd3ff329c").then(console.log).catch(console.error)
        // todolistsApi.updateTask("35bb7bce-2f3a-4817-9f11-e5ca4e69fd8f","f83a1bde-e08a-4076-9cdc-6f29cee9871e", '222').then(console.log).catch(console.error)

    },[])

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
                                <Grid item key={tl.id}>
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
