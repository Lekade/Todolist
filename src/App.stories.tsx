import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { App } from "./App"
import { ReduxStoreProviderDecorator } from "./store/decorators/ReduxStoreProviderDecorator"

const meta: Meta<typeof App> = {
  title: "TODOLISTS/App",
  component: App,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof meta>

export const AppStory: Story = {}
