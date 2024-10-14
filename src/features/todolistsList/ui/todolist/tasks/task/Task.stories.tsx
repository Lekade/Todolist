import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Task } from "features/todolistsList/ui/todolist/tasks/task/Task"
import { ReduxStoreProviderAndThemeDecorator } from "app/decorators/ReduxStoreProviderDecorator"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/Store"
import { v1 } from "uuid"
import { TaskDomainType } from "features/todolistsList/model/tasks-slice"
import { TaskPriorities, TaskStatuses } from "features/todolistsList/lib/enums"

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderAndThemeDecorator],
}
export default meta
type Story = StoryObj<typeof meta>

const TaskWrapper = () => {
  let task = useSelector<AppRootStateType, TaskDomainType>((state) => state.tasks["todolistId1"][0])
  if (!task) {
    task = {
      id: v1(),
      title: "DEFAULT TASK",
      todoListId: "todolistId1",
      description: "",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      order: "",
      addedDate: "",
      entityStatus: "idle",
    }
  }
  return <Task task={task} />
}

export const TaskStory: Story = {
  render: () => <TaskWrapper />,
}
