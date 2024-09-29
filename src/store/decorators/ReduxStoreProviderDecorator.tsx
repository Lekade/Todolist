import React, { ReactNode, useCallback, useState } from "react"
import { Provider } from "react-redux"
import { AppRootStateType, rootReducer } from "../Store"
import { legacy_createStore } from "redux"
import { v1 } from "uuid"
import { createTheme, ThemeProvider } from "@mui/material"
import { ThemeMode } from "../../App"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import { TaskStatuses } from "../../api/todolists-api"

const initialGlobalState: AppRootStateType = {
  todos: [
    { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        todoListId: "todolistId1",
        status: TaskStatuses.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: 0,
        order: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "JS",
        todoListId: "todolistId1",
        status: TaskStatuses.Completed,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: 0,
        order: "",
        entityStatus: "idle",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        todoListId: "todolistId2",
        status: TaskStatuses.Completed,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: 0,
        order: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React Book",
        todoListId: "todolistId2",
        status: TaskStatuses.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: 0,
        order: "",
        entityStatus: "idle",
      },
    ],
  },
  app: { status: "loading", error: null, isInitialized: true },
  auth: { isLoggedIn: true },
}

const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any)
export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const ReduxStoreProviderAndThemeDecorator = (storyFn: (changeModeHandler: () => void) => ReactNode) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#0FC0FC",
      },
    },
  })

  const changeModeHandler = useCallback(() => {
    setThemeMode(themeMode == "light" ? "dark" : "light")
  }, [themeMode])

  return (
    <Provider store={storyBookStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch onChange={changeModeHandler} />
        {storyFn(changeModeHandler)}
      </ThemeProvider>
    </Provider>
  )
}
