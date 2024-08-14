import type { Meta, StoryObj } from '@storybook/react';
import React, {useState} from "react";
import {TransformTitle} from "./TransformTitle";

const meta: Meta<typeof TransformTitle> = {
    title: 'TODOLISTS/TransformTitle',
    component: TransformTitle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof meta>;

const TransformTitleWrapper = () => {
    const [title, setTitle] = useState('JS')
    const changeTitle = (newTitle:string) => {
        setTitle(newTitle)
    }

    return <TransformTitle title={title} changeTitle={changeTitle}/>
}

export const TransformTitleStory: Story = {
    render: () => <TransformTitleWrapper/>
}
