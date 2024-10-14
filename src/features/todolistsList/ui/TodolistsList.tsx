import React, { useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "features/todolistsList/ui/todolist/Todolist"
import { addTodolist, getTodos, TodolistDomainType } from "features/todolistsList/model/todolists-slice"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/Store"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/model/auth-slice"
import { useAppDispatch, useAppSelector } from "common/hooks"

export const TodolistsList = () => {
  const todos = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todos)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const addTodolistHandler = useCallback(
    (titleTodoList: string) => {
      return dispatch(addTodolist(titleTodoList))
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
