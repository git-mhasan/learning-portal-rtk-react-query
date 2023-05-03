import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAddNewQuizMutation } from '../../features/quiz/quizApi';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const AddQuiz = () => {
    /* 
       One video lecture might have many quiz questions and each question will have four options  
   */
    const { data: videos, isLoading: vidoeLoading, isError: videoError, isSuccess: videoSuccess } = useGetVideosQuery();
    const [addNewQuiz, { isLoading, isError, isSuccess }] = useAddNewQuizMutation();
    const navigate = useNavigate();
    const [addQuizData, setAddQuizData] = useState({
        question: "",
        video_id: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
    });

    const [addQuizOptionAnswer, setAddQuizOptionAnswer] = useState({
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
        if (videos?.length > 0) setAddQuizData({
            ...addQuizData,
            video_id: videos[0]?.id
        })
    }, [videos])


    const handleInput = (event) => {
        setAddQuizData({ ...addQuizData, [event.target.name]: event.target.value });
    }
    const handleCheckInput = (event) => {
        setAddQuizOptionAnswer(
            { ...addQuizOptionAnswer, [event.target.name]: event.target.checked }
        );
    }


    const handleAddQuiz = (event) => {
        event.preventDefault();
        /* 
            Checking if the quiz related fields are empty and
            if at least an option is given as quiz answer.  
        */
        const isEmpty = Object.values(addQuizData).some(x => x === null || x === '');
        const isCorrectAnsExist = Object.values(addQuizOptionAnswer).find(x => x === true);
        if (!isEmpty && isCorrectAnsExist) {
            addNewQuiz({
                question: addQuizData.question,
                video_id: parseInt(addQuizData?.video_id),
                video_title: videos?.find(x => x.id == addQuizData?.video_id).title,
                options: [
                    {
                        id: 1,
                        option: addQuizData.option_1,
                        isCorrect: addQuizOptionAnswer.option_1
                    },
                    {
                        id: 2,
                        option: addQuizData.option_2,
                        isCorrect: addQuizOptionAnswer.option_2
                    },
                    {
                        id: 3,
                        option: addQuizData.option_3,
                        isCorrect: addQuizOptionAnswer.option_3
                    },
                    {
                        id: 4,
                        option: addQuizData.option_4,
                        isCorrect: addQuizOptionAnswer.option_4
                    },
                ],
            });

        } else {
            alert("Please fillup all the field and mark at least an option as correct answer.");
        }
    }

    // decide what to render.
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

    if (!vidoeLoading && !videoError && videos?.length > 0) {

        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0" style={{ width: "500px" }}>
                <div>
                    <h4 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Add Quiz</h4>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="lws-video_id">Select Video:</label>
                            <select name="video_id" id="lws-video_id" className="w-full max-w-[150px] border-2 login-input rounded-md text-gray-500"
                                value={addQuizData.video_id}
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
                                    value={addQuizData.question} onChange={handleInput} />
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="lws-option_1">Option-1:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_1" checked={addQuizOptionAnswer.option_1} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_1" name="option_1"
                                    value={addQuizData.option_1} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_2">Option-2:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_2" checked={addQuizOptionAnswer.option_2} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_2" name="option_2"
                                    value={addQuizData.option_2} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_3">Option-3:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_3" checked={addQuizOptionAnswer.option_3} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_3" name="option_3"
                                    value={addQuizData.option_3} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="lws-option_4">Option-4:</label>
                                <input style={{ marginLeft: "16px" }} type="checkbox" name="option_4" checked={addQuizOptionAnswer.option_4} onChange={handleCheckInput} /> Correct Answer
                                <input required className="login-input rounded-md" type="text" id="lws-option_4" name="option_4"
                                    value={addQuizData.option_4} onChange={handleInput} />
                            </div>
                        </div>


                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            id="lws-submit" onClick={handleAddQuiz}>Add Quiz</button>
                    </form>
                </div>
            </div >
        </main >
    }

    /* 
       If error occure while adding quiz to database.
     */
    if (isError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error adding quiz.</h4>

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

export default AddQuiz;