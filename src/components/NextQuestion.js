function NextQuestion({ dispatch, answer, index, maxNumOfQuestions }) {
  // if the answer is empty will not display button
  if (answer === null) return;

  // check if is not the last question
  if (index < maxNumOfQuestions - 1)
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
  if (index === maxNumOfQuestions - 1)
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
