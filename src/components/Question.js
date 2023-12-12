import Options from "./Options";
import { useQuiz } from "../Contexts/QuizContext";

function Question() {
  const { index, questions } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        // correctOption={question.correctOption}
        // dispatch={dispatch}
        // answer={answer}
      />
    </div>
  );
}

export default Question;
