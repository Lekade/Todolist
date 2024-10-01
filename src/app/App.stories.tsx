import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { App } from "app/App"
import { ReduxStoreProviderDecorator } from "app/decorators/ReduxStoreProviderDecorator"

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
