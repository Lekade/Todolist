import { TransformTitle } from "common/components/transformTItle/TransformTitle"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import React, { useCallback } from "react"
import styled from "styled-components"
import { changeTodolistTitle, removeTodolist, TodolistDomainType } from "features/todolistsList/model/todolists-slice"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const removeTodoListHandler = () => {
    dispatch(removeTodolist({ id }))
  }

  const changeTodoListTitleHandler = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitle({ id, title }))
    },
    [dispatch],
  )

  return (
    <TitleTodolistBlock>
      <TransformTitle title={title} changeTitle={changeTodoListTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton
        aria-label="delete"
        onClick={removeTodoListHandler}
        size="large"
        disabled={entityStatus === "loading"}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </TitleTodolistBlock>
  )
}

const TitleTodolistBlock = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  h3 {
    margin-top: 12px;
  }
`
