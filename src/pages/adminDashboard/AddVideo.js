import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAddVideoMutation } from '../../features/videos/videosApi';

const AddVideo = () => {
    const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();
    const navigate = useNavigate();
    const [videoAddData, setVideoAddData] = useState({
        title: "",
        description: "",
        url: "",
        views: "",
        duration: "",
    });

    useEffect(() => {
        if (isSuccess && !isError) navigate("/admin/videos");
    }, [isSuccess])


    const handleInput = (event) => {
        setVideoAddData({ ...videoAddData, [event.target.name]: event.target.value });
    }

    const handleAddVideo = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(videoAddData).some(x => x === null || x === '');
        if (!isEmpty) {
            addVideo({ ...videoAddData, createdAt: new Date().toISOString() });
        } else {
            alert("Please fillup all the field.");
        }
    }

    let content = <main className="py-6 bg-primary grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <h4 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Add New Video</h4>
                <form className="mt-8 space-y-6">
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="lws-videoTitle">Video Title:</label>
                                <input required className="login-input rounded-md" type="text" id="lws-videoTitle" name="title"
                                    value={videoAddData.title} onChange={handleInput} />
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-description">Video Description:</label>
                            <input required className="login-input rounded-md" type="text" id="lws-description" name="description"
                                value={videoAddData.description} onChange={handleInput} />
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <label htmlFor="lws-url">Video Url:</label>
                        <input required className="login-input rounded-md" type="text" id="lws-url" name="url"
                            value={videoAddData.url} onChange={handleInput} />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-duration">Duration</label>
                            <input required className="login-input rounded-md" type="text" id="lws-duration" name="duration"
                                value={videoAddData.duration} onChange={handleInput} />
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="lws-views">Views</label>
                            <input required className="login-input rounded-md" type="text" id="lws-views" name="views"
                                value={videoAddData.views} onChange={handleInput} />
                        </div>
                    </div>


                    <button type="submit" disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        id="lws-submit" onClick={handleAddVideo}>Add Video</button>
                </form>
            </div>
        </div >
    </main >


    /* 
        If error occure while adding video to database.
    */
    if (isError) {
        content = <main className="py-6 bg-primary grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div className="mt-8 space-y-6">
                    <h4 className="mb-8 text-xl font-bold text-center">There is an error adding Video.</h4>

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

export default AddVideo;