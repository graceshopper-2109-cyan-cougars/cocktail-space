import React, { useState } from 'react';
import { getFunName, rando } from '../utility';

export default function Quiz() {
  const questions = [
    {
      questionText: 'What is your age?',
      answerOptions: [
        { answerText: 'Under 18', isCorrect: true },
        { answerText: '18 to 24', isCorrect: true },
        { answerText: '35 to 45', isCorrect: true },
        { answerText: 'Old!!!', isCorrect: true },
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    {
      questionText: 'How many drunk fights have you been in?',
      answerOptions: [
        { answerText: '0', isCorrect: true },
        { answerText: '1', isCorrect: true },
        { answerText: '2', isCorrect: true },
        { answerText: '10+', isCorrect: true },
      ],
    },
    {
      questionText: `What do you do when you're alone?`,
      answerOptions: [
        { answerText: 'code a bit', isCorrect: true },
        { answerText: 'code alot', isCorrect: false },
        { answerText: 'code all the time', isCorrect: false },
        { answerText: 'Netflix', isCorrect: true },
      ],
    },
    {
      questionText: `What geothermal Icelandic site has the same name as a 1980 movie??`,
      answerOptions: [
        { answerText: 'Xanadu', isCorrect: false },
        { answerText: 'The Shining', isCorrect: false },
        { answerText: `Heaven's Gate`, isCorrect: false },
        { answerText: 'The Blue Lagoon', isCorrect: true },
      ],
    },
    {
      questionText: `Which European country technically shares a border with Brazil, because one of its “overseas departments” does?`,
      answerOptions: [
        { answerText: 'Germany', isCorrect: false },
        { answerText: 'Belgium', isCorrect: false },
        { answerText: 'France', isCorrect: true },
        { answerText: 'Great Britain', isCorrect: true },
      ],
    },
    {
      questionText: `Where does The Muffin Man live?`,
      answerOptions: [
        { answerText: 'Drury Yoda', isCorrect: false },
        { answerText: 'Doda Lane', isCorrect: false },
        { answerText: 'Drury Duda', isCorrect: false },
        { answerText: 'Drury Lane', isCorrect: true },
      ],
    },
  ];

  const randomDrink = [
    'https://images.unsplash.com/photo-1629311782811-0676689953a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1628642551066-11f79288a424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    'https://images.unsplash.com/photo-1614614099289-6ea03064c9e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className='quizWrapper'>
      <div className='quiz'>
        {showScore ? (
          <div className='personaScore-section'>
            Your score: <span className='boldScore'>{score}</span> Your drink
            persona:
            <br />
            <span className='persona'>{getFunName()} </span>
            <br />
            <div className='imageWrapper'>
              <img
                className='randomImg'
                src={rando(randomDrink)}
                style={{ height: 200, width: 200, borderRadius: '1rem' }}
                alt=''
              />
            </div>
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className='question-text'>
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className='answer-section'>
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    className='quizButton'
                    key={index}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
