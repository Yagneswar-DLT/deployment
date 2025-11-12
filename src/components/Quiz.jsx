import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteLogo from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const curQuestionIndex = userAnswers.length;

  const handleSelect = useCallback(
    (selectedAnswer = null) =>
      setUserAnswers((prev) => [...prev, selectedAnswer]),
    [curQuestionIndex]
  );
  console.log(userAnswers);

  //   const skippedQuestion = useCallback(() => handleSelect(null), [handleSelect]);

  const quizCompleted = QUESTIONS.length === curQuestionIndex;

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteLogo} alt="Quiz Complete Logo" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={curQuestionIndex}
        index={curQuestionIndex}
        onSelectAnswer={handleSelect}
        onSkipped={handleSelect}
      />
    </div>
  );
}
