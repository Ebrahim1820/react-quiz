import { useEffect } from "react";
import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { dispatch, points, highscore, maxNumberofPoints } = useQuiz();

  const percentage = (points / maxNumberofPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎈";
  if (percentage >= 80 && percentage < 100) emoji = "💪";
  if (percentage >= 60 && percentage < 80) emoji = "👍";
  if (percentage >= 40 && percentage < 60) emoji = "😯😯";

  useEffect(
    function () {
      localStorage.setItem("highscore", JSON.stringify(highscore));
    },
    [highscore]
  );

  return (
    <>
      <p className="result">
        <span>{emoji}</span>Your scored
        <strong> {points}</strong> out of {maxNumberofPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(The Highest Score Is {highscore} Points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
