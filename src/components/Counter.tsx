import { create } from "../lib/react-store";
import { createStore } from "../lib/store";

const store = createStore({ count: 0 });
const useCounter = create(store);

const increment = () => {
  store.setState({ count: store.getState().count + 1 });
};

const decrement = () => {
  store.setState({ count: store.getState().count - 1 });
};

export default function Counter() {
  const { count } = useCounter();
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span data-test="count">Count: {count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
