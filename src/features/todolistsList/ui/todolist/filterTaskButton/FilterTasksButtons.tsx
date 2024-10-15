import React from "react"
import { changeTodolistFilter, FilterValuesType } from "features/todolistsList/model/todolists-slice"
import { useAppDispatch } from "common/hooks"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"

type Props = {
  todoListId: string
  filter: FilterValuesType
}
export const FilterTasksButtons = ({ todoListId: id, filter }: Props) => {
  const dispatch = useAppDispatch()

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id, filter }))
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => changeTasksFilterHandler("all")}
        variant={filter === "all" ? "outlined" : "contained"}
        color={"primary"}
      >
        All
      </Button>
      <Button
        onClick={() => changeTasksFilterHandler("active")}
        variant={filter === "active" ? "outlined" : "contained"}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        onClick={() => changeTasksFilterHandler("completed")}
        variant={filter === "completed" ? "outlined" : "contained"}
        color={"primary"}
      >
        Completed
      </Button>
    </ButtonGroup>
  )
}
