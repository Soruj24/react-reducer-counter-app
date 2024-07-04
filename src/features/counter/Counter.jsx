import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);

  const despatch = useDispatch();

  return (
    <div>
      <h3>Counter : {count}</h3>
      <button onClick={() => despatch(increment())}>+</button>
      <button onClick={() => despatch(reset())}>0 </button>
      <button onClick={() => despatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;
