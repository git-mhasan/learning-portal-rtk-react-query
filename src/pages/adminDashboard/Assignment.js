import React from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentList from '../../components/adminAssignnment/AssignmentList';
import Navbar from '../../components/Navbar';
import { useGetAssignmentsQuery } from '../../features/assignment/assignmentApi';

const Assignment = () => {
    const { data: allAssignment, isLoading, isError } = useGetAssignmentsQuery();
    const navigate = useNavigate();
    const handleAddAssignment = () => {
        navigate("/admin/assignment/add");
    }

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>There is an error.</p>
        );
    } else if (!isLoading && !isError && allAssignment?.length === 0) {
        content = (
            <p>No assignment found.</p>
        );

    } else if (!isLoading && !isError && allAssignment?.length > 0) {
        content = <AssignmentList allAssignment={allAssignment} />
    }

    return (
        <div>
            <Navbar />
            <div className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto"
                                onClick={handleAddAssignment}>Add Assignment</button>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            {
                                content
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Assignment;