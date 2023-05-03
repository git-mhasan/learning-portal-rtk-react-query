import React from 'react';
import AssignmentList from '../../components/adminAssignmentMarks/AssignmenMarkstList';
import Navbar from '../../components/Navbar';
import { useGetAllAssignmentMarkQuery } from '../../features/assignment/assignmentApi';

const AssignmentMarks = () => {

    const { data: assignmentMarks, isLoading, isError } = useGetAllAssignmentMarkQuery();

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>There is an error.</p>
        );
    } else if (!isLoading && !isError && assignmentMarks?.length === 0) {
        content = (
            <p>No assignment submitted.</p>
        );

    } else if (!isLoading && !isError && assignmentMarks?.length > 0) {
        const totalAssignment = assignmentMarks?.length || 0;
        const pendingAssignment = assignmentMarks?.reduce((a, b) => {
            if (b.status === "pending") {
                return a + 1
            }
            else {
                return a
            }
        }, 0);
        const publishedAssignment = assignmentMarks?.reduce((a, b) => {
            if (b.status === "published") {
                return a + 1
            }
            else {
                return a
            }
        }, 0);
        content =
            <div className="px-3 py-20 bg-opacity-10">
                <ul className="assignment-status">
                    <li>Total <span>{totalAssignment}</span></li>
                    <li>Pending <span>{pendingAssignment}</span></li>
                    <li>Mark Sent <span>{publishedAssignment}</span></li>
                </ul>
                <AssignmentList assignmentMarks={assignmentMarks} />
            </div>
    }

    return (
        <div>
            <Navbar />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    {
                        content
                    }
                </div>
            </section>
        </div>
    );
};

export default AssignmentMarks;