import { createSelector } from "reselect"
import { TaskDomainType, TasksStateType } from "features/todolistsList/model/tasks-slice"
import { FilterValuesType } from "features/todolistsList/model/todolists-slice"
import { TaskStatuses } from "features/todolistsList/lib/enums"

const selectTasksForTodolist = (state: TasksStateType, todoListId: string) => state[todoListId]
const selectFilter = (state: TasksStateType, todoListId: string, filter: FilterValuesType) => filter

export const selectFilteredTasks = createSelector(
  [selectTasksForTodolist, selectFilter], // входные селекторы
  (tasksForTodolist: TaskDomainType[], filter: FilterValuesType) => {
    if (!tasksForTodolist) return []

    if (filter === "active") {
      return tasksForTodolist.filter((task) => task.status === TaskStatuses.New)
    }
    if (filter === "completed") {
      return tasksForTodolist.filter((task) => task.status === TaskStatuses.Completed)
    }
    return tasksForTodolist
  },
)
