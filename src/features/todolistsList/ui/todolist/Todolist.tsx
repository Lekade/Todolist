import React, { memo, useCallback, useEffect } from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { addTask, getTasks } from "features/todolistsList/model/tasks-slice"
import { TodolistDomainType } from "features/todolistsList/model/todolists-slice"
import { useAppDispatch } from "common/hooks"
import { FilterTasksButtons } from "features/todolistsList/ui/todolist/filterTaskButton/FilterTasksButtons"
import { Tasks } from "features/todolistsList/ui/todolist/tasks/Tasks"
import { TodolistTitle } from "features/todolistsList/ui/todolist/todolistTitle/TodolistTitle"

type TodolistPropsType = {
  todolist: TodolistDomainType
}

export const Todolist = memo(({ todolist }: TodolistPropsType) => {
  const { id, filter, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const addTaskHandler = useCallback(
    (title: string) => {
      return dispatch(addTask({ todoListId: id, title }))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(getTasks(id))
  }, [])

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todoListId={id} filter={filter} />
      <FilterTasksButtons todoListId={id} filter={filter} />
    </div>
  )
})
