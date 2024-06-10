import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    classes?: string
}

export const Button = ({title, onClickHandler, disabled, classes}:ButtonPropsType) => {
    return (
        <button className={classes} disabled={disabled} onClick={onClickHandler}>
            {title}
        </button>
    );
};
