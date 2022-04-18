import { map, merge, Subject } from "rxjs";
import { createStore, Reducer } from "../lib/createStore";

export enum GameMode {
    view,
    edit
}
export class GameState {
    constructor(public mode: GameMode = GameMode.view) {}
}

export const toggleMode$ = new Subject<void>()

export const gameStore$ = createStore<GameState>(
    merge<Reducer<GameState>[]>(
        toggleMode$.pipe(map(() => (s) => ({ ...s, mode: s.mode === GameMode.view ? GameMode.edit : GameMode.view })))
    ),
    new GameState()
)