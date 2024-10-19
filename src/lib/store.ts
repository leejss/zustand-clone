type Listener = () => void;
type SetStateAction<TState> = TState | ((prevState: TState) => Partial<TState>);

export interface Store<TState> {
  getState: () => TState;
  setState: (action: SetStateAction<TState>) => void;
  subscribe: (listener: Listener) => () => void;
}

export function createStore<TState>(initialState: TState): Store<TState> {
  let state = initialState;
  const listeners = new Set<Listener>();

  function isActionCallable(
    action: SetStateAction<TState>,
  ): action is (prevState: TState) => Partial<TState> {
    return typeof action === "function";
  }

  const getState = () => state;
  const setState = (action: SetStateAction<TState>) => {
    const partialStaste = isActionCallable(action) ? action(state) : action;
    state = { ...state, ...partialStaste };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
}
