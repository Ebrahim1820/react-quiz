import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

//
//
const SEC_PER_QUESTION = 30;
const highestScore = JSON.parse(localStorage.getItem("highscore"));
const initialState = {
  questions: [],

  //'loading','error','ready','active'm 'finish'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: highestScore,
  secondRemains: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondRemains: state.questions.length * SEC_PER_QUESTION,
      };

    case "setAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    // OR--> this is also second way

    // case "restart":
    //   return {
    //     ...state,
    //     index: 0,
    //     answer: null,
    //     points: 0,

    //     status: "ready",
    //   };

    case "tick":
      return {
        ...state,
        secondRemains: state.secondRemains - 1,
        status: state.secondRemains === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action..");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondRemains },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxNumberFoPoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        if (!res.ok) throw new Error("soem things goes wrong..!");

        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            num={numOfQuestions}
            dispatch={dispatch}
            score={highscore > highestScore ? highscore : highestScore}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={numOfQuestions}
              index={index}
              points={points}
              maxPoints={maxNumberFoPoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemains={secondRemains} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                maxNumOfQuestions={numOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxNumbOfPoints={maxNumberFoPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
