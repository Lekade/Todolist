import React, {ReactNode, useCallback, useState} from 'react'
import { Provider } from 'react-redux';
import {AppRootStateType, rootReducer} from "../Store";
import {legacy_createStore} from "redux";
import {v1} from "uuid";
import {createTheme, ThemeProvider} from "@mui/material";
import {ThemeMode} from "../../App";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";

const initialGlobalState: AppRootStateType = {
    todolists: [
        {todolistId: "todolistId1", title: "What to learn", filter: "all"},
        {todolistId: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {taskId: v1(), title: "HTML&CSS", isDone: false},
            {taskId: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {taskId: v1(), title: "Milk", isDone: true},
            {taskId: v1(), title: "React Book", isDone: false}
        ]
    }
};

const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any)
export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const ReduxStoreProviderAndThemeDecorator = (storyFn: (changeModeHandler: () => void) => ReactNode) => {
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

    return <Provider store={storyBookStore}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Switch onChange={changeModeHandler}/>
        {storyFn(changeModeHandler)}
        </ThemeProvider>
    </Provider>
}