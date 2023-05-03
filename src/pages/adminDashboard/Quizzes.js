import React from 'react';
import Navbar from '../../components/Navbar';
import QuizzesList from '../../components/adminQuiz/QuizzesList';
import { useGetQuizzesQuery } from '../../features/quiz/quizApi';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {

    const { data: allQuizzes, isLoading, isError } = useGetQuizzesQuery();
    const navigate = useNavigate();

    const handleAddQuiz = () => {
        navigate("/admin/quizzes/add");
    }

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>There is an error.</p>
        );
    } else if (!isLoading && !isError && allQuizzes?.length === 0) {
        content = (
            <p>No quizzes found.</p>
        );

    } else if (!isLoading && !isError && allQuizzes?.length > 0) {
        content = <QuizzesList allQuizzes={allQuizzes} />
    }

    return (
        <div>
            <Navbar />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto"
                                onClick={handleAddQuiz}>Add Quiz</button>
                        </div>
                        {
                            content
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quizzes;