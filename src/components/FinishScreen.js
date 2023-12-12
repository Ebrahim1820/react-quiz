import { useEffect } from "react";
function FinishScreen({ points, maxNumbOfPoints, highscore, dispatch }) {
  const percentage = (points / maxNumbOfPoints) * 100;

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
        <strong>{points}</strong> out of {maxNumbOfPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Highscore {highscore} points)</p>

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
