import React from 'react';
import Navbar from '../../components/Navbar';
import VideoList from '../../components/adminVideo/VideoList';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import { useNavigate } from 'react-router-dom';

const Videos = () => {
    const { data: allVideos, isLoading, isError } = useGetVideosQuery();
    const navigate = useNavigate();

    const handleAddVideo = () => {
        navigate("/admin/videos/add");
    }

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>There is an error.</p>
        );
    } else if (!isLoading && !isError && allVideos?.length === 0) {
        content = (
            <p>No vidoes found.</p>
        );

    } else if (!isLoading && !isError && allVideos?.length > 0) {
        content = <VideoList allVideos={allVideos} />
    }

    return (
        <div>
            <Navbar />

            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto"
                                onClick={handleAddVideo}>Add Video</button>
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

export default Videos;