import React from 'react';
import { useGetAllAssignmentMarkQuery } from '../../features/assignment/assignmentApi';
import { useGetAllQuizMarksQuery } from '../../features/quiz/quizApi';
import { useAllStudentsQuery } from '../../features/auth/authApi';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/authSelector';
import Navbar from '../../components/Navbar';
import LeaderItem from '../../components/leaderboard/LeaderItem';

const Leaderboard = () => {

    const loggedInStudent = useSelector(selectAuthUser);
    const { data: allQuizMarks, isLoading: quizMarksLoading, isError: quizMarksError,
        isSuccess: quizMarksSuccess } = useGetAllQuizMarksQuery() || {};
    const { data: allAssignmentMarks, isLoading: assignmentLoading, isError: assignmentError,
        isSuccess: assignmentSuccess } = useGetAllAssignmentMarkQuery() || {};
    const { data: students, isLoading, isError, isSuccess } = useAllStudentsQuery();


    let content = null;

    if (quizMarksLoading || assignmentLoading) {
        content = <p>Loading...</p>;
    } else if ((!quizMarksLoading && !assignmentLoading) && (quizMarksError || assignmentError)) {
        content = (
            <p>There is an error.</p>
        );
    } else if ((!quizMarksLoading && !assignmentLoading) && (quizMarksSuccess || assignmentSuccess) && students?.length > 0) {
        /* 
            Leaderboard marks and rank calculation 
        */
        const leaderboard = students.map(student => {

            let totalAssignmentMark = 0;
            let totalQuizMark = 0;
            let grandTotal = 0;
            let studentAssignmentMarks = allAssignmentMarks.filter(x => x.student_id === student.id);
            let studentQuizMarks = allQuizMarks.filter(x => x.student_id === student.id);
            if (studentAssignmentMarks.length > 0) {
                totalAssignmentMark = studentAssignmentMarks.reduce((x, y) => { return (x + Number(y.mark)) }, 0)
            }
            if (studentQuizMarks.length > 0) {
                totalQuizMark = studentQuizMarks.reduce((x, y) => { return (x + Number(y.mark)) }, 0)
            }
            grandTotal = totalAssignmentMark + totalQuizMark;


            return {
                studentId: student.id,
                name: student.name,
                quizMarks: totalQuizMark,
                assignmentMark: totalAssignmentMark,
                total: grandTotal
            };
        })

        /* 
        Several students might have same rank 
        */
        let maxTotalNumber = Math.max(...leaderboard.map(x => x.total));
        let rank = 1;
        const leaderboardWithRank = leaderboard.sort((a, b) => b.total - a.total).map((student) => {
            if (Number(student.total) === Number(maxTotalNumber)) {
                return {
                    ...student,
                    rank: rank
                }
            } else if (Number(student.total) < Number(maxTotalNumber)) {
                rank++;
                maxTotalNumber = student.total
                return {
                    ...student,
                    rank: rank
                }
            }
        })

        content = <LeaderItem leaderboardWithRank={leaderboardWithRank} loggedInStudentId={loggedInStudent.id} />

    }

    return (
        <div>
            <Navbar />

            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {
                        content
                    }

                </div>
            </section>

        </div>

    );
};

export default Leaderboard;