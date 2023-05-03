import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddQuizMarksMutation } from '../../features/quiz/quizApi';
import QuizItem from './QuizItem';

const QuizCollection = ({ quizzes, student, video }) => {
    const { video_title } = quizzes[0] || {};
    const navigate = useNavigate();
    const [addQuizMarks, { isLoading, isSuccess, isError }] = useAddQuizMarksMutation();
    const [quizAttempts, setQuizAttempts] = useState({})

    /* 
        Calculating quiz marks and prepare the data for adding to quiz marks database.
        adding all 1's of the quizAttempts array will give the total number of correct answer.  
     */
    const handleQuizSubmission = () => {
        const quizSubmitData = {
            totalCorrect: Object.values(quizAttempts)?.reduce((a, b) => a + b, 0),
            totalWrong: quizzes.length - Object.values(quizAttempts)?.reduce((a, b) => a + b, 0),
            mark: Object.values(quizAttempts)?.reduce((a, b) => a + b, 0) * 5,
            student_id: student?.id,
            student_name: student?.name,
            video_id: video?.id,
            video_title: video?.title,
            totalQuiz: quizzes.length,
            totalMark: parseInt(quizzes.length) * 5,
        }
        addQuizMarks(quizSubmitData);

        navigate("/leaderboard");
    }

    useEffect(() => {
        if (isError) alert("There is an error submitting quiz")
    }, [])


    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">{video_title}</h1>
                <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div className="space-y-8 ">
                {
                    quizzes.map((quiz, index) => <QuizItem key={index} quiz={quiz} quizNo={index}
                        quizAttempts={quizAttempts} setQuizAttempts={setQuizAttempts} />)
                }

            </div>

            <button
                onClick={handleQuizSubmission}
                disabled={isLoading || isSuccess}
                className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
        </div>
    );
};

export default QuizCollection;