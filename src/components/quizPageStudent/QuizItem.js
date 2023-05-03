import React, { useState } from 'react';
import isAnswerCorrect from '../../utils/evaluateQuiz';

const QuizItem = ({ quiz, quizNo, quizAttempts, setQuizAttempts }) => {

    const { question, options } = quiz || {};
    const answerArray = options.map(x => x.isCorrect)

    /* 
        Handle checkbox selection with an array. The users answer state will be maintened with an array.   
     */
    const [checkedState, setCheckedState] = useState(
        new Array(options.length).fill(false)
    );

    const handleOptionSelect = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        /* 
            Correct answer is decided by stringified comparison of 
            the array of actual correct answer from db to the array of choosen answers.
        
            Evaluating correct answer by entering 1 for correct attempts and 
            0 for wrong attempts in the quizAttempts array.   
         */
        setQuizAttempts({
            ...quizAttempts,
            [quizNo]: isAnswerCorrect(answerArray, updatedCheckedState)
        });
    }

    return (
        <div className="quiz">
            <h4 className="question">Quiz {parseInt(quizNo) + 1} - {question}</h4>
            <form className="quizOptions">
                {options.map((option, index) => {
                    return (
                        <label key={index} htmlFor={`option${quizNo}_q${option.id}`}>
                            <input type="checkbox" id={`option${quizNo}_q${option.id}`} onChange={() => handleOptionSelect(index)} />
                            {option.option}
                        </label>)
                })}

            </form>
        </div>
    );
};

export default QuizItem;