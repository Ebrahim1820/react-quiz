import { useQuiz } from "../Contexts/QuizContext";

export default function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswerd = answer !== null;

  const correctOption = question.correctOption;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswerd ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={hasAnswerd}
          onClick={(e) => dispatch({ type: "setAnswer", payload: index })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
