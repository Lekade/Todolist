import React, { memo, useCallback } from "react"
import { TransformTitle } from "../transformTItle/TransformTitle"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { removeTask, TaskDomainType, updateTask } from "store/tasks-slice"
import { TaskStatuses } from "api/todolists-api"
import { useAppDispatch } from "store/Store"

type TaskPropsType = {
  task: TaskDomainType
  todoListId: string
}

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  console.log("render task")
  const { id, status, title, entityStatus } = task
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTask({ todoListId, id }))
  }, [dispatch])

  const changeStatusTask = useCallback(
    (isDone: boolean) => {
      const status = isDone ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(updateTask({ task, model: { status } }))
    },
    [dispatch, task, status],
  )
  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(updateTask({ task, model: { title } }))
    },
    [dispatch, task, title],
  )

  return (
    <ListItem
      sx={{
        p: 0,
        justifyContent: "space-between",
        opacity: status ? 0.5 : 1,
      }}
    >
      <Checkbox
        onChange={(e) => changeStatusTask(e.currentTarget.checked)}
        checked={status > 0}
        disabled={entityStatus === "loading"}
      />
      <TransformTitle
        style={status ? "task-done" : "task"}
        changeTitle={changeTaskTitle}
        title={title}
        disabled={entityStatus === "loading"}
      />
      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})
