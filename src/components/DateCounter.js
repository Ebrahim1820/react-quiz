import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };

    case "inc":
      return { ...state, count: state.count + state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unkown action type happens..");
  }
}

function DateCounter() {
  const [state, dispach] = useReducer(reducer, initialState);

  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // const dec = function () {
  //   dispach({ type: "dec" });
  // };

  // const inc = function () {
  //   dispach({ type: "inc" });
  // };

  // const defineCount = function (e) {
  //   dispach({ type: "setCount", payload: Number(e.target.value) });
  // };

  // const defineStep = function (e) {
  //   dispach({ type: "setStep", payload: Number(e.target.value) });
  // };

  // const reset = function () {
  //   dispach({ type: "reset" });
  // };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispach({
              type: "setStep",
              payload: Number(e.target.value),
            })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispach({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispach({ type: "setCount", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispach({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispach({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
