import { useQuiz } from "../Contexts/QuizContext";

function Progress() {
  const { numOfQuestions, index, points, maxNumberFoPoints, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question
        <strong>
          {index + 1}/{numOfQuestions}{" "}
        </strong>
      </p>
      <p>
        <strong> {points}</strong>/{maxNumberFoPoints}
      </p>
    </header>
  );
}

export default Progress;
