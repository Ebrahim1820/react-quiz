import { useQuiz } from "../Contexts/QuizContext";

function NextQuestion() {
  const { dispatch, answer, index, numOfQuestions } = useQuiz();
  // if the answer is empty will not display button
  if (answer === null) return;

  // check if is not the last question
  if (index < numOfQuestions - 1)
    // only run if there is an answer
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  if (index === numOfQuestions - 1)
    // only run if there is an answer
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}

export default NextQuestion;
