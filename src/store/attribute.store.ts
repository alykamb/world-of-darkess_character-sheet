import { map, merge, Subject } from "rxjs";
import { createStore, Reducer } from "../lib/createStore";
import { Attribute } from "../models/Attribute";
import { commit$ } from "./xp.store";

export interface AttributeState {
    value: Attribute,
    tempValue: Attribute
}

export function createAttributeStore(initialValue: Attribute) {
    const initialState = {
        value: initialValue,
        tempValue: initialValue.clone()
    }

    const set$ = new Subject<number>();

    const store$ = createStore<AttributeState>(
        merge<Reducer<AttributeState>[]>(
            set$.pipe(
                map((value) => (s) => ({
                    value: s.value,
                    tempValue: s.tempValue.mergeClone({value})
                }))
            ),
            commit$.pipe(
                map(() => (s) => ({
                    value: s.tempValue.clone(),
                    tempValue: s.tempValue.clone(),
                }))
            )
        ),
        initialState
    )

    return {
        store$,
        set$
    }

}


