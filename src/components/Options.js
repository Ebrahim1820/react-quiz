export default function Options({ question, correctOption, dispatch, answer }) {
  const hasAnswerd = answer !== null;

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
