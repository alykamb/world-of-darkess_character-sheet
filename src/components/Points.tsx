import { Component, createSignal, Index, Signal } from "solid-js";
import { calculateCost, IncreseablePoint } from "../models/IncreaseablePoint";
import { increaseTempXp$ } from "../store/xp.store";
import { Point } from "./Point";

export interface PointsProps {
    point: IncreseablePoint
    set: (value: number) => void
}

const togglePoint = (point: IncreseablePoint, [points, setPoints]: Signal<boolean[]>) => (i: number) =>{
    let pointsDelta = 0;

    const ps = [...points()];
    const enable = ps[i]
    const newPoints = [...ps]

    for (let j = Math.max(point.value - 1, 0); j < point.maxValue; j++) {
        if(!enable && j <= i && !ps[j]) {
            newPoints[j] = true
            pointsDelta++
        } else if(enable && j >= i && ps[j]) {
            newPoints[j] = false
            pointsDelta--
        }
    }

    setPoints(newPoints)

    return pointsDelta
}

const useHover = () => {
    const [hover, setHover] = createSignal<number|null>(null)

    return {
        hover,
        onMouseEnter(i: number) {
            setHover(i)
        },
        onMouseLeave() {
            setHover(null)
        }
    }
}

export const Points: Component<PointsProps> = (props) => {
    const pointsSignal = createSignal(new Array(props.point.maxValue).fill(0).map((_, i) => i < props.point.value ? true : false))
    const [points] = pointsSignal

    const handlePointClick = togglePoint(props.point, pointsSignal)
    const {hover, onMouseEnter, onMouseLeave} = useHover()

    const onClick = (i: number) => {
        let newValue = i+1
        if(newValue <= props.point.value) {
            newValue = i
        }
        handlePointClick(i)
        increaseTempXp$.next(calculateCost(props.point, newValue))
        props.set(newValue)
    }

    return (
        <div className="points">
            {props.point.value}
            <Index each={points()}>
                {(p, i) => <Point
                    checked={p()}
                    onClick={() => onClick(i)}
                    onMouseEnter={() => onMouseEnter(i)}
                    onMouseLeave={onMouseLeave}
                    hover={(hover() ?? -1) >= i}
                />}
            </Index>
        </div>
    )
}