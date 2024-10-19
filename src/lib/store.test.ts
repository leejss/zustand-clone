import { describe, it, expect, vi } from "vitest";
import { createStore } from "./store";

describe("createStore", () => {
  it("should initialize with the correct state", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it("should return the current state", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it("should update the state correctly", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1 });
  });

  it("should call listeners when the state changes", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const listener = vi.fn();
    store.subscribe(listener);
    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalled();
  });

  it("should remove listeners correctly", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.setState({ count: 1 });
    expect(listener).not.toHaveBeenCalled();
  });
});
