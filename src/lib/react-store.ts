import { useSyncExternalStore } from "react";
import { Store } from "./store";

type Selector<TState, TResult> = (state: TState) => TResult;

export function create<TState>(store: Store<TState>) {
  return function useStore<TResult = TState>(
    selector?: Selector<TState, TResult>,
  ): TResult {
    const getSnapshot = () =>
      selector
        ? selector(store.getState())
        : (store.getState() as unknown as TResult);
    return useSyncExternalStore(store.subscribe, getSnapshot);
  };
}
