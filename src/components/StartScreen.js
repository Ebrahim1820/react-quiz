import { useQuiz } from "../Contexts/QuizContext";

function StartScreen() {
  const { numOfQuestions, dispatch, highscore, highestScore } = useQuiz();
  const score = highscore > highestScore ? highscore : highestScore;

  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3> {numOfQuestions} questions to test React mastery</h3>
      <h2>Highest Score is : {score} </h2>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
