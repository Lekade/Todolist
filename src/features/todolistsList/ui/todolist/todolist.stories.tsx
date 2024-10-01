import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ReduxStoreProviderAndThemeDecorator } from "app/decorators/ReduxStoreProviderDecorator"
import { Todolist } from "features/todolistsList/ui/todolist/Todolist"

const meta: Meta<typeof Todolist> = {
  title: "TODOLISTS/Todolist",
  component: Todolist,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    todolist: {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  },
  decorators: [ReduxStoreProviderAndThemeDecorator],
}
export default meta
type Story = StoryObj<typeof meta>

export const TodolistStory = {}
