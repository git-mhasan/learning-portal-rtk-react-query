import React from 'react';
import VideoItem from '../adminVideo/VideoItem';
import AssignmentItem from './AssignmentItem';

const AssignmentList = ({ allAssignment }) => {
    return (
        <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {
                    allAssignment?.map((item, index) => <AssignmentItem key={index} assignment={item} />)
                }
            </tbody>
        </table>
    );
};

export default AssignmentList;