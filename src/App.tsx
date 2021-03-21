import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API';


const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  console.log(fetchQuizQuestions());

  const startTrivia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }
  
  return (
    <div className="App">
      <h1> Welcome to Trivia! </h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>  
      <p className="score"> Score: </p>
      <p> Loading Questions .. ..</p>
      {/* <QuestionCard 
        questionNo = {number + 1}
        totalQuestions = {10}
        question = {questions[number].question}
        answers = {questions[number].answers}
        userAnswer = {userAnswers ? userAnswers[number]: undefined}
        callback = {checkAnswer}
      /> */}
      <button className='next' onClick={nextQuestion}> 
        Next Question
      </button>
    </div>
  );
}

export default App;
