import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ allVideos }) => {

    return (
        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Description</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">

                    {
                        allVideos.map(item => <VideoItem key={item.id} video={item} />)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default VideoList;