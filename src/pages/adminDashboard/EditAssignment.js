import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useEditAssignmentMutation, useGetAssignmentByIdQuery, useGetAssignmentsQuery } from '../../features/assignment/assignmentApi';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const EditAssignment = () => {
    /* 
        For persistency of data on reload, we fetch data inside the component
    */
    const { assignmentId } = useParams();
    const { data: assignment, isLoading: editAssignmentLoading, isError: editAssignmentError } = useGetAssignmentByIdQuery(assignmentId);
    const { data: videos, isLoading: vidoeLoading, isError: videoError, isSuccess: videoSuccess } = useGetVideosQuery();
    const { data: assignments, isLoading: assignmentLoading, isError: assignmentError, isSuccess: assignmentSuccess } = useGetAssignmentsQuery();

    const [editAssignment, { isLoading, isError, isSuccess }] = useEditAssignmentMutation();
    const navigate = useNavigate();
    const [assignmentEditData, setAssignmentEditData] = useState({
        title: "",
        video_id: "",
        totalMark: "",
    });

    useEffect(() => {
        if (isSuccess && !isError) navigate("/admin/assignment");
    }, [isSuccess])


    // initiate the dropdown list with first available video
    useEffect(() => {
        if (!editAssignmentLoading && assignment?.id) {
            setAssignmentEditData({
                title: assignment.title,
                video_id: assignment.video_id,
                totalMark: assignment.totalMark,
            })
        }
    }, [editAssignmentLoading, assignments])


    const handleInput = (event) => {
        setAssignmentEditData({ ...assignmentEditData, [event.target.name]: event.target.value });
    }

    const handleEditAssignment = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(assignmentEditData).some(x => x === null || x === '');
        if (!isEmpty) {
            editAssignment({
                id: assignment?.id,
                data: {
                    title: assignmentEditData?.title,
                    video_id: parseInt(assignmentEditData?.video_id),
                    video_title: videos?.find(x => x.id == assignmentEditData?.video_id)?.title,
                    totalMark: Number(assignmentEditData?.totalMark),
                }
            });

        } else {
            alert("Please fillup all the field.");
        }
    }

    // decide what to render.
    let content = null
    if (vidoeLoading || assignmentLoading) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">loading...</h4>
                </div>
            </div>
        </main>
    }
    if ((!vidoeLoading || !assignmentLoading) && (videoError || assignmentError)) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">Somothing wrong...</h4>
                </div>
            </div>
        </main>
    }

    if (!vidoeLoading && !assignmentLoading && !videoError && !assignmentError && videos?.length === 0) {
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


    if (!vidoeLoading && !assignmentLoading && !videoError && !assignmentError && assignmentSuccess && videos?.length > 0 && assignment?.id) {


        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0" style={{ width: "500px" }}>
                <div>
                    <h4 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Assignment</h4>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="lws-videoTitle">Assignment Title:</label>
                                <input required className="login-input rounded-md" type="text" id="lws-videoTitle" name="title"
                                    value={assignmentEditData.title} onChange={handleInput} />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="lws-video_id">Select Video:</label>
                            <select name="video_id" id="lws-video_id" className="w-full max-w-[150px] border-2 login-input rounded-md text-gray-500"
                                value={assignmentEditData.video_id}
                                onChange={handleInput}
                            // defaultValue={videos[0].id}
                            >
                                <option value={assignment.video_id}>{assignment.video_title.slice(0, 65)}</option>
                                {
                                    videos
                                        .filter(item => !assignments.find(x => x.video_id == item.id))
                                        .map((video, index) => <option key={index} value={video.id}>{video.title.slice(0, 65)}</option>)
                                }


                            </select>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-description">Total Marks:</label>
                            <input required className="login-input rounded-md" type="number" id="lws-description" name="totalMark"
                                value={assignmentEditData.totalMark} onChange={handleInput} />
                        </div>


                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            id="lws-submit" onClick={handleEditAssignment}>Save Changes</button>
                    </form>
                </div>
            </div >
        </main >
    }

    /* 
       If error occure while editing assignment to database.
     */
    if (isError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error editing assignment.</h4>

                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={() => navigate("/admin/assignment")}>Go back to Assignment Page</button>
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

export default EditAssignment;