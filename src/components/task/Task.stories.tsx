import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {Task} from "./Task";
import {
  ReduxStoreProviderAndThemeDecorator,
} from "../../store/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/Store";
import {TaskType} from "../../App";
import {v1} from "uuid";
import {fn} from "@storybook/test";

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
  if(!task){task = {taskId: v1(), title: "DEFAULT TASK", isDone: false}}
  return <Task task={task} todolistId={"todolistId1"}/>
}

export const TaskStory : Story = {
  render: () => <TaskWrapper/>
}
