import { map, merge, Subject } from "rxjs"
import { createStore, Reducer } from "../lib/createStore"

export class XpState {
    constructor(public xp = 0, public tempXp = 0) {}
}

export const increaseXp$ = new Subject<number>()
export const increaseTempXp$ = new Subject<number>()
export const resetTempXp$ = new Subject<void>()
export const commit$ = new Subject<void>()
export const cancel$ = new Subject<void>()

export const xpStore$ = createStore<XpState>(
    merge<Reducer<XpState>[]>(
        increaseXp$.pipe(map((n) => (s) => ({ ...s, xp: s.xp + n }))),
        increaseTempXp$.pipe(map((n) => (s) => ({ ...s, tempXp: s.tempXp + n }))),
        resetTempXp$.pipe(map(() => (s) => ({ ...s, tempXp: 0 }))),
        commit$.pipe(map(() => (s) => ({ ...s, xp: s.xp + s.tempXp, tempXp: 0 }))),
        cancel$.pipe(map(() => (s) => ({ ...s, tempXp: 0 })))
    ), new XpState()
)


;(window as any).increase = (n: number) => increaseXp$.next(n)