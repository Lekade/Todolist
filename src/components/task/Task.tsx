import React, { memo, useCallback } from "react"
import { TransformTitle } from "../transformTItle/TransformTitle"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { removeTaskTC, TaskDomainType, updateTasksTC } from "store/tasks-slice"
import { TaskStatuses } from "api/todolists-api"
import { useAppDispatch } from "store/Store"

type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
}

export const Task = memo(({ task, todolistId }: TaskPropsType) => {
  console.log("render task")
  const { id, status, title, entityStatus } = task
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskTC(todolistId, id))
  }, [dispatch])

  const changeStatusTask = useCallback(
    (isDone: boolean) => {
      const status = isDone ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(updateTasksTC(task, { status }))
    },
    [dispatch, task],
  )
  const changeTaskTitle = useCallback(
    (newTaskTitle: string) => {
      dispatch(updateTasksTC(task, { title: newTaskTitle }))
    },
    [dispatch, task],
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
