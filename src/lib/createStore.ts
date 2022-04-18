import { BehaviorSubject, Observable, scan } from "rxjs";

export type Reducer<T> = (state: T) => T;

export function createStore<T = any, Q extends Reducer<T> = Reducer<T>>(reducers: Observable<Q>, initialState: T = null as unknown as T):BehaviorSubject<T> {
    const store = new BehaviorSubject(initialState);

    reducers.pipe(
        scan((state, reducer: Q) => reducer(state), initialState)
    ).subscribe((state) => {
        store.next(state);
    })

    return store;
}