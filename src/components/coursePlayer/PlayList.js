import React from 'react';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import VideoItem from './VideoItem';

const PlayList = () => {

    const { data: videosList, isLoading, isError, error } = useGetVideosQuery() || {};

    /*  
        Deciding what to render
     */
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>Error...</p>
        );
    } else if (!isLoading && !isError && videosList?.length === 0) {
        content = <p>No videos found!</p>;
    } else if (!isLoading && !isError && videosList?.length > 0) {
        content = videosList.map(video => <VideoItem key={video.id} video={video} />);
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

            {
                content
            }

        </div>
    );
};

export default PlayList;