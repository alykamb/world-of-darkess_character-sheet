import { Observable } from "rxjs";
import { createEffect, createSignal } from "solid-js";

export const useSubscribe = <T>(obs$: Observable<T>) => {
    const [value, setValue] = createSignal<T>()
    createEffect(() => {
        const subscription = obs$.subscribe(v => setValue(() => v));
        return () => subscription.unsubscribe();
    })

    return value;
}