import React from 'react';
import { Link, useParams } from 'react-router-dom';

const VideoItem = ({ video }) => {

    const { id, title, description, url, views, duration, createdAt } = video || {};
    const { videoId } = useParams();
    /*  
        Clicking on video item from video list will run the video on video player. 
     */
    return (
        <Link to={`/lesson/${id}`}>
            <div className={`w-full flex flex-row gap-2 cursor-pointer p-2 py-3 ${(videoId == id) ? "bg-violet-600 bg-opacity-10" : "hover:bg-slate-900"}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                </div>

                {/* <!-- Description --> */}
                <div clas="flex flex-col w-full">
                    <div>
                        <p className="text-slate-50 text-sm font-medium">{title}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 text-xs mt-1">{duration} Mins</span>
                        <span className="text-gray-400 text-xs mt-1"> | </span>
                        <span className="text-gray-400 text-xs mt-1">{views} views</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoItem;