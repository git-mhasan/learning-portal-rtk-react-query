import React from 'react';

const LeaderItem = ({ leaderboardWithRank, loggedInStudentId }) => {
    const loggedInStudent = leaderboardWithRank.find(x => x.studentId == loggedInStudentId);

    return (
        <>
            <div>
                {/* Showing loggedin student's mark on top of the leaderboard. */}
                <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr>
                            <th className="table-th !text-center">Rank</th>
                            <th className="table-th !text-center">Name</th>
                            <th className="table-th !text-center">Quiz Mark</th>
                            <th className="table-th !text-center">Assignment Mark</th>
                            <th className="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-2 border-cyan">
                            <td className="table-td text-center font-bold">{loggedInStudent.rank}</td>
                            <td className="table-td text-center font-bold">{loggedInStudent.name}</td>
                            <td className="table-td text-center font-bold">{loggedInStudent.quizMarks}</td>
                            <td className="table-td text-center font-bold">{loggedInStudent.assignmentMark}</td>
                            <td className="table-td text-center font-bold">{loggedInStudent.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-8">
                <h3 className="text-lg font-bold">Top 20 Result</h3>
                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr className="border-b border-slate-600/50">
                            <th className="table-th !text-center">Rank</th>
                            <th className="table-th !text-center">Name</th>
                            <th className="table-th !text-center">Quiz Mark</th>
                            <th className="table-th !text-center">Assignment Mark</th>
                            <th className="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    {/* Showing top 20 students mark in the leaderboard. */}
                    <tbody>
                        {
                            leaderboardWithRank.slice(0, 20).map((student, index) => {
                                return <tr key={index} className={`${student.studentId == loggedInStudentId ? "border-2 border-cyan" : "border-b border-slate-600/50"}`}>
                                    <td className="table-td text-center">{student.rank}</td>
                                    <td className="table-td text-center">{student.name}</td>
                                    <td className="table-td text-center">{student.quizMarks}</td>
                                    <td className="table-td text-center">{student.assignmentMark}</td>
                                    <td className="table-td text-center">{student.total}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LeaderItem;