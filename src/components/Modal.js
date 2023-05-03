import React, { useEffect, useState } from "react";
import { useAddAssignmentSubmissionMutation } from "../features/assignment/assignmentApi";

/* 
    Assignment submission is handled with this modal.
 */
function Modal({ open, control, assignmentInfo }) {

    const [repoUrl, setRepoUrl] = useState("")
    const [addAssignmentSubmission, { isLoading: assignmentSubmissionLoading, isError: assignmentSubmissionError, isSuccess: assignmentSubmissionSuccess }] = useAddAssignmentSubmissionMutation()

    useEffect(() => {
        if (assignmentSubmissionSuccess) {
            setRepoUrl("");
            control()
        };
        if (assignmentSubmissionError) alert("There is an error submitting assignement!");
    }, [assignmentSubmissionSuccess])

    const handleSubmit = (event) => {
        event.preventDefault();
        addAssignmentSubmission(
            {
                ...assignmentInfo,
                repo_link: repoUrl,
                status: "pending",
                mark: 0,
                createdAt: new Date().toISOString()
            }
        );
    }

    const handleInputChange = (event) => {
        setRepoUrl(event.target.value);
    }

    return (
        <>
            {
                open && <div className="modalBackground">
                    <div className="modalContainer">

                        <div className="title text-violet-600">
                            <h1>Assignment Repo Link:</h1>
                            <p className="text-red-500 text-sm font-medium">[N.B. Assignment can be submitted once.]</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                            <div className="rounded-md body">

                                <div>
                                    <label htmlFor="repo_link" className="text-lg">
                                        Github Repository Link:
                                    </label>
                                    <input
                                        id="repo_link"
                                        name="repo_link"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative my-8 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                        placeholder="Github Repo Link"
                                        value={repoUrl}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="footer">
                                <button
                                    onClick={control}
                                    className="bg-red-600"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-cyan" disabled={assignmentSubmissionLoading}>Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            }
        </>
    );
}

export default Modal;