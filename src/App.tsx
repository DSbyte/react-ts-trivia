import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API';
import { QuestionState } from './API';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions();

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer == answer;

      if (correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);

    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion == 10) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }
  
  return (
    <div className="App">
      <h1> Welcome to Trivia! </h1>
      {gameOver || userAnswers.length == 10 ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button> 
      ): null}
      {!gameOver ? <p className="score"> Score: { score }</p> : null}
      {loading ? <p> Loading Questions ... ..</p> : null}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNo = {number + 1}
          totalQuestions = {10}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number]: undefined}
          callback = {checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length == number + 1 && number != 9 ? (
        <button className='next' onClick={nextQuestion}> 
          Next Question
        </button>
      ): null}
      
    </div>
  );
}

export default App;
