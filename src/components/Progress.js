function Progress({ index, numOfQuestions, points, maxPoints, answer }) {
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
        <strong> {points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;