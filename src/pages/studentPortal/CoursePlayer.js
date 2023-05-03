import moment from 'moment/moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PlayList from '../../components/coursePlayer/PlayList';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import { useGetAssignmentQuery, useGetStudentAssignmentMarkQuery, } from '../../features/assignment/assignmentApi';
import { selectAuthUser } from '../../features/auth/authSelector';
import { useGetRelatedQuizMarksQuery, useGetRelatedQuizQuery } from '../../features/quiz/quizApi';
import { useGetVideoQuery } from '../../features/videos/videosApi';

const CoursePlayer = () => {

    const { videoId } = useParams();
    const student = useSelector(selectAuthUser);
    const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId) || {};
    const { data: assignment, isLoading: assignmentLoading, isSuccess: isAssignmentSuccess } = useGetAssignmentQuery(videoId) || {};
    const { data: quizzes, isLoading: quizLoading, isSuccess: isQuizSuccess } = useGetRelatedQuizQuery(videoId) || {};
    const { data: assignmentMarks, isLoading: assignmentMarksLoading, isSuccess: assignmentMarksSuccess } = useGetStudentAssignmentMarkQuery(student.id) || {};
    const { data: quizMarks, isLoading: quizMarksLoading, isSuccess: quizMarksSuccess } = useGetRelatedQuizMarksQuery(student.id) || {};

    const { id, title, description, url, views, duration, createdAt } = video || {};
    /* 
        Modal control state
     */
    const [opened, setOpened] = useState(false);
    const [assignmentInfo, setAssignmentInfo] = useState({});

    const controlModal = () => {
        /* 
            Check if the assignment is submitted. Otherwise open modal
         */
        if (assignmentMarks.find(x => x?.assignment_id == assignment[0].id)) {
            alert("আপনার এসাইনমেন্ট জমা হয়েছে।");
        } else {
            setOpened((prevState) => !prevState);
        }

    };

    let content = null;

    if (isLoading || assignmentLoading || quizLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>Error loading video.</p>
        );
    } else if (!isLoading && !isError && !id) {
        content = <p>No video data!</p>;
    } else if (!isLoading && !isError && id && isAssignmentSuccess
        && isQuizSuccess && assignmentMarksSuccess && quizMarksSuccess) {

        let assignmentSubmitInfo;

        if (assignment?.length > 0) {
            assignmentSubmitInfo = {
                student_id: student.id,
                student_name: student.name,
                assignment_id: assignment[0].id,
                title: assignment[0].title,
                totalMark: assignment[0].totalMark,
            }
        }

        content = <>
            {/* Adding autoplay option on clicking video from playlist */}
            <iframe width="100%" className="aspect-video" src={url + "?autoplay=1"}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>

            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {moment(createdAt).format('MMMM DD YYYY')}</h2>


                <div className="flex gap-4">

                    {assignment?.length > 0 && <div onClick={() => {
                        controlModal()
                        setAssignmentInfo(assignmentSubmitInfo);
                    }}
                        className="cursor-pointer px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                        এসাইনমেন্ট
                    </div>}

                    {quizzes?.length > 0 ?
                        !quizMarks.find(x => x.video_id == id)?.id
                            ? <Link to={`/quiz/${id}`}
                                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                                অংশগ্রহণ
                                করুন</Link>
                            : <p className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm">
                                কুইজ দিয়েছেন</p>
                        :
                        <p className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm">
                            কুইজ নেই</p>
                    }
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                    {description}
                </p>


            </div>
        </>
    }


    return (
        <div>
            <Modal open={opened} control={controlModal} assignmentInfo={assignmentInfo} />

            <Navbar />

            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            {
                                content
                            }
                        </div>

                        {/* Video playlist goes here */}
                        <PlayList />

                    </div>
                </div>
            </section>

        </div>

    );
};

export default CoursePlayer;