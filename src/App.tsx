import React, {useCallback, useState} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material";
import {TodolistsList} from "./components/todolistsList/TodolistsList";
import {ErrorSnackbar} from "./components/errorSnackbar/ErrorSnackbar";


export type ThemeMode = 'dark' | 'light'


function App() {
    console.log('render App')

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
            <ErrorSnackbar />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>
                    <Header changeModeHandler={changeModeHandler}/>
                    <TodolistsList/>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App;
