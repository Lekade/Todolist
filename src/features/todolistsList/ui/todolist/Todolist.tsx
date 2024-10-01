import React, { memo, useCallback, useEffect, useMemo } from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { TransformTitle } from "common/components/transformTItle/TransformTitle"
import { Task } from "features/todolistsList/ui/todolist/task/Task"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styled from "styled-components"
import ButtonGroup from "@mui/material/ButtonGroup"
import { addTask, getTasks, TaskDomainType } from "features/todolistsList/model/tasks-slice"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/Store"
import {
  changeTodolistFilter,
  changeTodolistTitle,
  FilterValuesType,
  removeTodolist,
  TodolistDomainType,
} from "features/todolistsList/model/todolists-slice"
import { MemoButton } from "common/components/button/MemoButton"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "features/todolistsList/lib/enums"

type TodolistPropsType = {
  todolist: TodolistDomainType
}

export const Todolist = memo(({ todolist }: TodolistPropsType) => {
  console.log("render todolist")
  const { id, filter, title, entityStatus } = todolist
  const dispatch = useAppDispatch()
  const tasks = useSelector<AppRootStateType, TaskDomainType[]>((state) => state.tasks[id])

  const removeTodoListHandler = useCallback(() => {
    dispatch(removeTodolist(id))
  }, [dispatch])

  const changeToDoListTitleHandler = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitle({ id, title }))
    },
    [dispatch],
  )
  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTask({ todoListId: id, title }))
    },
    [dispatch],
  )
  const changeTaskFilter = (filter: FilterValuesType, id: string) => {
    dispatch(changeTodolistFilter({ id, filter }))
  }

  const onAllClickHandler = useCallback(() => {
    changeTaskFilter("all", id)
  }, [])
  const onActiveClickHandler = useCallback(() => {
    changeTaskFilter("active", id)
  }, [])
  const onCompletedClickHandler = useCallback(() => {
    changeTaskFilter("completed", id)
  }, [])

  const filtredTasks: TaskDomainType[] = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => task.status === TaskStatuses.New)
    }
    if (filter === "completed") {
      return tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    return tasks
  }, [filter, tasks])

  useEffect(() => {
    dispatch(getTasks(id))
  }, [])

  return (
    <div className="todolist">
      <TitleTodolistBlock>
        <TransformTitle title={title} changeTitle={changeToDoListTitleHandler} disabled={entityStatus === "loading"} />
        <IconButton
          aria-label="delete"
          onClick={removeTodoListHandler}
          size="large"
          disabled={entityStatus === "loading"}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TitleTodolistBlock>
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      {filtredTasks.length === 0 ? (
        <p>Your taskslist is empty</p>
      ) : (
        <TasksContainer>
          {filtredTasks.map((task) => {
            return <Task key={task.id} todoListId={id} task={task} />
          })}
        </TasksContainer>
      )}
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MemoButton onClick={onAllClickHandler} variant={filter === "all" ? "outlined" : "contained"} color={"primary"}>
          All
        </MemoButton>
        <MemoButton
          onClick={onActiveClickHandler}
          variant={filter === "active" ? "outlined" : "contained"}
          color={"primary"}
        >
          Active
        </MemoButton>
        <MemoButton
          onClick={onCompletedClickHandler}
          variant={filter === "completed" ? "outlined" : "contained"}
          color={"primary"}
        >
          Completed
        </MemoButton>
      </ButtonGroup>
    </div>
  )
})

const TasksContainer = styled.ul`
  padding-left: 0;
`
const TitleTodolistBlock = styled.div`
  margin-bottom: 25px;
`
