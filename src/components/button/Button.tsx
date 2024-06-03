import React from 'react';

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
}

export const Button = ({title, onClickHandler, disabled}:ButtonPropsType) => {
    return (
        <button disabled={disabled} onClick={onClickHandler}>
            {title}
        </button>
    );
};
