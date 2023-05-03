import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { selectAuthUser } from '../../features/auth/authSelector';
import { useGetRelatedQuizMarksQuery, useGetRelatedQuizQuery } from '../../features/quiz/quizApi';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import QuizCollection from '../../components/quizPageStudent/QuizCollection';

const Quiz = () => {
    const { videoId } = useParams();
    const student = useSelector(selectAuthUser);
    const { data: video, isLoading: videoLoading, isError, error } = useGetVideoQuery(videoId) || {};
    const { data: quizzes, isLoading: quizLoading, isSuccess: isQuizSuccess, isError: quizError } = useGetRelatedQuizQuery(videoId) || {};
    const { data: quizMarks, isLoading: quizMarksLoading, isSuccess: quizMarksSuccess } = useGetRelatedQuizMarksQuery(student.id) || {};

    let content = null;

    if (quizLoading || videoLoading || quizMarksLoading) {
        content = <p>Loading...</p>;
    } else if (!quizLoading && quizError) {
        content = (
            <p>Error loading video.</p>
        );
    } else if (!quizLoading && !quizError && !quizzes.length > 0) {
        content = <p>No video data!</p>;
    } else if (!quizLoading && !quizError && quizzes.length > 0 &&
        student?.id && video?.id && isQuizSuccess) {
        if (quizMarks.find(x => x.video_id == video.id)?.id) {

            content = <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="space-y-8 ">
                    <div className="quiz">
                        <h2 className="question">The quiz has been submitted.</h2>
                    </div>
                </div>
            </div>

        } else {
            content = <QuizCollection quizzes={quizzes} student={student} video={video} />
        }

    }

    return (
        <div>

            <Navbar />

            <section className="py-6 bg-primary">

                {/* Quiz content goes here */}
                {
                    content
                }

            </section>

        </div>
    );
};

export default Quiz;