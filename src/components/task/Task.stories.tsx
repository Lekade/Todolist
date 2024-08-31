import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {Task} from "./Task";
import {
  ReduxStoreProviderAndThemeDecorator,
} from "../../store/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/Store";
import {v1} from "uuid";
import {fn} from "@storybook/test";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderAndThemeDecorator]
};
export default meta;
type Story = StoryObj<typeof meta>;

const TaskWrapper = () => {
  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0])
  if(!task){task = {
    id: v1(),
    title: "DEFAULT TASK",
    todoListId: "todolistId1",
    description: '',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: 0,
    deadline: '',
    order: 0,
    addedDate: 0,
  }}
  return <Task task={task} todolistId={"todolistId1"}/>
}

export const TaskStory : Story = {
  render: () => <TaskWrapper/>
}
