import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {
    ReduxStoreProviderAndThemeDecorator,
} from "../../store/decorators/ReduxStoreProviderDecorator";
import {Todolist} from "./Todolist";

const meta: Meta<typeof Todolist> = {
    title: 'TODOLISTS/Todolist',
    component: Todolist,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args:{
        todolist: {todolistId: "todolistId1", title: "What to learn", filter: "all"}
    },
    decorators: [ReduxStoreProviderAndThemeDecorator]
};
export default meta;
type Story = StoryObj<typeof meta>;

export const TodolistStory = {}