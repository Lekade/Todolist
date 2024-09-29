import React, { useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "../addItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "../todolist/Todolist"
import { addTodolist, getTodos, TodolistDomainType } from "store/todolists-slice"
import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch, useAppSelector } from "store/Store"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "store/auth-slice"

export const TodolistsList = () => {
  console.log("render TodolistsList")

  const todos = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todos)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const addTodolistHandler = useCallback(
    (titleTodoList: string) => {
      dispatch(addTodolist(titleTodoList))
    },
    [dispatch],
  )

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getTodos())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistHandler} />
      </Grid>
      <Grid container spacing={4}>
        {todos.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper elevation={6} sx={{ p: "30px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
