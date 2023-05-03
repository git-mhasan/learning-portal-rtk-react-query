import moment from 'moment';
import React, { useState } from 'react';
import { useEditStudentAssignmentMarkMutation } from '../../features/assignment/assignmentApi';

const AssignmentMarkItem = ({ assignmentMark }) => {
    const [editStudentAssignmentMark, { isLoading, isSuccess }] = useEditStudentAssignmentMarkMutation();
    const [marks, setMarks] = useState(0);
    /*  
        Mutation Api call for Update assignment Marks
     */
    const handleMarking = () => {
        /*  
           Checking if the assignment marking is within the limit of total marks
         */
        if (Number(marks) <= Number(assignmentMark.totalMark) && Number(marks) >= 0) {
            editStudentAssignmentMark({
                id: assignmentMark?.id,
                data: {
                    mark: marks,
                    status: "published"
                }
            });
        } else {
            alert("Assignment marks exceed the limit.")
        }

    }
    const handleMarkingInput = (event) => {
        setMarks(event.target.value);
    }

    return (
        <tr>
            <td className="table-td">{assignmentMark?.title}</td>
            <td className="table-td">{moment(assignmentMark?.createdAt).format('DD MMM YYYY, h:mm:ss a')}</td>
            <td className="table-td">{assignmentMark?.student_name}</td>
            <td className="table-td">{assignmentMark?.repo_link}</td>
            {assignmentMark.status === "pending" ? <td className="table-td input-mark">
                <input max={assignmentMark?.totalMark} min="0" value={marks} onChange={handleMarkingInput} />
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                    onClick={handleMarking}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </td>
                : <td className="table-td">{assignmentMark?.mark}</td>
            }
        </tr>
    );
};

export default AssignmentMarkItem;