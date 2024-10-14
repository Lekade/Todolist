import React, { useCallback } from "react"
import { TransformTitle } from "common/components/transformTItle/TransformTitle"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { removeTask, TaskDomainType, updateTask } from "features/todolistsList/model/tasks-slice"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "features/todolistsList/lib/enums"

type Props = {
  task: TaskDomainType
}

export const Task = ({ task }: Props) => {
  const { todoListId, id, status, title, entityStatus } = task
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTask({ todoListId, id }))
  }

  const changeTaskStatusHandler = (isDone: boolean) => {
    const status = isDone ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTask({ todoListId, id, model: { status } }))
  }

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      dispatch(updateTask({ todoListId, id, model: { title } }))
    },
    [dispatch, task, title],
  )
  const statusLoading = entityStatus === "loading"

  return (
    <ListItem
      sx={{
        p: 0,
        justifyContent: "space-between",
        opacity: status ? 0.5 : 1,
      }}
    >
      <Checkbox
        onChange={(e) => changeTaskStatusHandler(e.currentTarget.checked)}
        checked={status > 0}
        disabled={statusLoading}
      />
      <TransformTitle
        style={status ? "task-done" : "task"}
        changeTitle={changeTaskTitleHandler}
        title={title}
        disabled={statusLoading}
      />
      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={statusLoading}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
