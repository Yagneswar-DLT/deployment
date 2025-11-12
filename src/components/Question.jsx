import QuestionTimer from "./QuestionTimer";
import Answer from "./Answer";
import { useState } from "react";
import QUESTIONS from "../questions";

export default function Question({ index, onSelectAnswer, onSkipped }) {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, timer);
    }, timer);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div className="question">
      <QuestionTimer
        key={timer}
        timeOut={timer}
        onTimeout={onSkipped}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answer
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectedAnswer}
      />
    </div>
  );
}
