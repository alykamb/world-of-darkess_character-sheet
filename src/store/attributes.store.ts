import { map, Subject } from "rxjs";
import { Atrribute, AttributesObj, createAttributes } from "../constants/attributes";
import { createStore } from "../lib/createStore";

const initialState = createAttributes()
export type AttributeState = AttributesObj

export const increase$ = new Subject<{ attribute: Atrribute, value: number }>();

export const atributeStore$ = createStore<AttributeState>(
    increase$.pipe(
        map((n) => (s) => ({
            ...s,
            [n.attribute]: {
                ...[n.attribute],
                value: s[n.attribute].value + n.value
            }
        }))
    ),
    initialState
)


