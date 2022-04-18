import { Component, mergeProps } from "solid-js";
import { styled } from "solid-styled-components";

const Btn = styled("button")`
    color: transparent;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;

    &.disabled {
        &, &.checked {
            color: #ccc;
            border-color: currentColor;
            cursor: default;
        }
    }

    &:hover,
    &.hover {
        &::after {
            opacity: .5;
            color: black;
        }
    }

    &.checked {
        color: black;
        animation-name: PointClick;
        animation-duration: 0.3s;

        &::after {
            opacity: 1;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: currentColor;
        opacity: 0;
        transition: 0.2s;
    }
`;

export interface PointProps {
    checked: boolean;
    disabled?: boolean;
    hover?: boolean;
    onClick?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
}

export const Point: Component<PointProps> = (props) => {
    const merged = mergeProps({checked: false, disabled: false, hover: false}, props);

    function dispatchClick(e: MouseEvent) {
        if(!merged.disabled && merged.onClick) {
            merged.onClick(e)
        }
    }

    return (
        <Btn
            classList={{
                checked: merged.checked,
                disabled: merged.disabled,
                hover: merged.hover,
            }}
            type="button"
            onClick={dispatchClick}
            onMouseEnter={merged.onMouseEnter}
            onMouseLeave={merged.onMouseLeave}
        />
    )
}