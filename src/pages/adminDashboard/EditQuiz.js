import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useEditQuizMutation, useGetQuizByIdQuery } from '../../features/quiz/quizApi';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const EditQuiz = () => {
    const { quizId } = useParams()
    const { data: quiz, isLoading: quizLoading } = useGetQuizByIdQuery(quizId)
    const { data: videos, isLoading: vidoeLoading, isError: videoError, isSuccess: videoSuccess } = useGetVideosQuery();
    const [editQuiz, { isLoading, isError, isSuccess }] = useEditQuizMutation();
    const navigate = useNavigate();


    const [editQuizData, setEditQuizData] = useState({
        question: "",
        video_id: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
    });

    const [editQuizAnswer, setEditQuizAnswer] = useState({
        option_1: false,
        option_2: false,
        option_3: false,
        option_4: false,
    });

    useEffect(() => {
        if (isSuccess && !isError) navigate("/admin/quizzes");
    }, [isSuccess])

    // initiate the dropdown list with first available video
    useEffect(() => {
        if (quiz?.id && videos?.length > 0) {
            setEditQuizData({
                question: quiz.question,
                video_id: quiz.video_id,
                option_1: quiz.options[0].option,
                option_2: quiz.options[1].option,
                option_3: quiz.options[2].option,
                option_4: quiz.options[3].option,
            })
            setEditQuizAnswer({
                option_1: quiz.options[0].isCorrect,
                option_2: quiz.options[1].isCorrect,
                option_3: quiz.options[2].isCorrect,
                option_4: quiz.options[3].isCorrect,
            })
        }
    }, [quiz, videos, quizLoading, vidoeLoading])


    const handleInput = (event) => {
        setEditQuizData({ ...editQuizData, [event.target.name]: event.target.value });
    }
    const handleCheckInput = (event) => {
        setEditQuizAnswer(
            { ...editQuizAnswer, [event.target.name]: event.target.checked }
        );
    }


    const handleAddQuiz = (event) => {
        event.preventDefault();
        /* 
            Checking if the quiz related fields are empty and
            if at least an option is given as quiz answer.  
        */
        const isEmpty = Object.values(editQuizData).some(x => x === null || x === '');
        const isCorrectAnsExist = Object.values(editQuizAnswer).find(x => x === true);
        if (!isEmpty && isCorrectAnsExist) {
            editQuiz({
                id: quiz.id,
                data: {
                    question: editQuizData.question,
                    video_id: parseInt(editQuizData?.video_id),
                    video_title: videos?.find(x => x.id == editQuizData?.video_id).title,
                    options: [
                        {
                            id: 1,
                            option: editQuizData.option_1,
                            isCorrect: editQuizAnswer.option_1
                        },
                        {
                            id: 2,
                            option: editQuizData.option_2,
                            isCorrect: editQuizAnswer.option_2
                        },
                        {
                            id: 3,
                            option: editQuizData.option_3,
                            isCorrect: editQuizAnswer.option_3
                        },
                        {
                            id: 4,
                            option: editQuizData.option_4,
                            isCorrect: editQuizAnswer.option_4
                        },
                    ],
                }
            });

        } else {
            alert("Please fillup all the field and mark at least an option as correct answer.");
        }
    }

    /* 
        decide what to render.
    */
    let content = null;
    if (vidoeLoading) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">loading...</h4>
                </div>
            </div>
        </main>
    }
    if (!vidoeLoading && videoError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">Somothing wrong...</h4>
                </div>
            </div>
        </main>
    }

    if (!vidoeLoading && !videoError && videos?.length === 0) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is no video to add assignment to.</h4>

                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={() => navigate("/admin/videos")}>Go back to Video Page</button>
                </div>
            </div>
        </main >
    }

    if (!vidoeLoading && !videoError && videos?.length > 0 && quiz?.id) {

        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0" style={{ width: "500px" }}>
                <div>
                    <h4 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Quiz</h4>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="lws-video_id">Select Video:</label>
                            <select name="video_id" id="lws-video_id" className="w-full max-w-[150px] border-2 login-input rounded-md text-gray-500"
                                value={editQuizData.video_id}
                                onChange={handleInput}
                            >
                                {
                                    videos.map((video, index) => <option key={index} value={video.id}>{video.title.slice(0, 65)}</option>)
                                }
                            </select>
                        </div>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="lws-question">Quiz Question:</label>
                                <input required className="login-input rounded-md" type="text" id="lws-question" name="question"
                                    value={editQuizData.question} onChange={handleInput} />
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="lws-option_1">Option-1:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_1" checked={editQuizAnswer.option_1} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_1" name="option_1"
                                    value={editQuizData.option_1} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_2">Option-2:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_2" checked={editQuizAnswer.option_2} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_2" name="option_2"
                                    value={editQuizData.option_2} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_3">Option-3:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_3" checked={editQuizAnswer.option_3} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_3" name="option_3"
                                    value={editQuizData.option_3} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_4">Option-4:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_4" checked={editQuizAnswer.option_4} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_4" name="option_4"
                                    value={editQuizData.option_4} onChange={handleInput} />
                            </div>
                        </div>


                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            id="lws-submit" onClick={handleAddQuiz}>Save Changes</button>
                    </form>
                </div>
            </div >
        </main >
    }

    /* 
        if error occured while editing mutation 
    */
    if (isError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error editing quiz.</h4>

                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={() => navigate("/admin/quizzes")}>Go back to Quiz Page</button>
                </div>
            </div>
        </main>
    }


    if (isSuccess) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">Video Added Successfully!</h4>
                </div>
            </div>
        </main>
    }

    return (
        <div>
            <Navbar />
            {content}
        </div>
    );
};

export default EditQuiz;