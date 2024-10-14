import { Task } from "features/todolistsList/ui/todolist/tasks/task/Task"
import React from "react"
import styled from "styled-components"
import { FilterValuesType } from "features/todolistsList/model/todolists-slice"
import { useAppSelector } from "common/hooks"
import { selectFilteredTasks } from "features/todolistsList/lib/selectFilteredTasks"

type Props = {
  todoListId: string
  filter: FilterValuesType
}

export const Tasks = ({ todoListId, filter }: Props) => {
  const tasks = useAppSelector((state) => selectFilteredTasks(state.tasks, todoListId, filter))
  return (
    <>
      {!tasks.length ? (
        <p>Your tasks list is empty</p>
      ) : (
        <TasksContainer>
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />
          })}
        </TasksContainer>
      )}
    </>
  )
}

const TasksContainer = styled.ul`
  padding-left: 0;
`
