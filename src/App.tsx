import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Header } from "components/header/Header"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material"
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/Store"
import { me } from "store/auth-slice"
import CircularProgress from "@mui/material/CircularProgress"
import { selectIsInitialized } from "store/app-slice"

export type ThemeMode = "dark" | "light"

export const App = () => {
  console.log("render App")
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(me())
  }, [])

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

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed>
          <Header changeModeHandler={changeModeHandler} />
          <Outlet />
        </Container>
      </ThemeProvider>
    </div>
  )
}
