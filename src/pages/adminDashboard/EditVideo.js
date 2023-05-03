import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useEditVideoMutation, useGetVideoQuery } from '../../features/videos/videosApi';

const EditVideo = () => {
    /* 
        For persistency of data on reload, we fetch data inside the component
    */

    const { videoId } = useParams();
    const { data: video, isLoading: vidoeLoading, isError: videoError, isSuccess: videoSuccess } = useGetVideoQuery(videoId);
    const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();
    const navigate = useNavigate();
    const [videoEditData, setVideoEditData] = useState({
        title: "",
        description: "",
        url: "",
        views: "",
        duration: "",
    });

    useEffect(() => {

        if (!vidoeLoading && video?.id) {
            setVideoEditData({
                title: video.title,
                description: video.description,
                url: video.url,
                views: video.views,
                duration: video.duration,
            })
        }
    }, [vidoeLoading, video])

    useEffect(() => {
        if (isSuccess && !isError) navigate("/admin/videos");
    }, [isSuccess])


    const handleInput = (event) => {
        setVideoEditData({ ...videoEditData, [event.target.name]: event.target.value });
    }

    const handleEditVideo = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(videoEditData).some(x => x === null || x === '');
        if (!isEmpty) {
            editVideo({
                id: video?.id,
                data: {
                    ...videoEditData, createdAt: new Date().toISOString()
                }
            });

        } else {
            alert("Please fillup all the field.");
        }
    }

    let content = <main className="py-6 bg-primary grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <h4 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Edit Video</h4>
                <form className="mt-8 space-y-6">
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="lws-videoTitle">Video Title:</label>
                                <input required className="login-input rounded-md" type="text" id="lws-videoTitle" name="title"
                                    value={videoEditData.title} onChange={handleInput} />
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-description">Video Description:</label>
                            <input required className="login-input rounded-md" type="text" id="lws-description" name="description"
                                value={videoEditData.description} onChange={handleInput} />
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <label htmlFor="lws-url">Video Url:</label>
                        <input required className="login-input rounded-md" type="text" id="lws-url" name="url"
                            value={videoEditData.url} onChange={handleInput} />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-duration">Duration</label>
                            <input required className="login-input rounded-md" type="text" id="lws-duration" name="duration"
                                value={videoEditData.duration} onChange={handleInput} />
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-views">Views</label>
                            <input required className="login-input rounded-md" type="text" id="lws-views" name="views"
                                value={videoEditData.views} onChange={handleInput} />
                        </div>
                    </div>


                    <button type="submit" disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={handleEditVideo}>Edit Video</button>
                </form>
            </div>
        </div >
    </main >

    /* 
        If error occure while editing video to database.
    */
    if (isError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error editing video.</h4>

                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={() => navigate("/admin/videos")}>Go back to Video Page</button>

                </div>
            </div>
        </main>
    }
    if (isSuccess) {
        content = <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    <h4 className="mb-8 text-xl font-bold text-center">Book Added Successfully!</h4>
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

export default EditVideo;