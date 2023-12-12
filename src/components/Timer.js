import { useEffect } from "react";
import { useQuiz } from "../Contexts/QuizContext";

function Timer() {
  const { dispatch, secondRemains } = useQuiz();

  const mins = Math.floor(secondRemains / 60);
  const seconds = secondRemains % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      // it's a clean up function to stiop timer
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
