import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () =>
                "/assignments",
        }),

        getAssignment: builder.query({
            query: (videoId) =>
                `/assignments?video_id=${videoId}`,
        }),

        getAssignmentById: builder.query({
            query: (assignmentId) =>
                `/assignments/${assignmentId}`,
        }),

        addAssignment: builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: assignmetnAdded } = await queryFulfilled;
                    //pessimistic cache update
                    if (assignmetnAdded?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getAssignments", undefined,
                            (draft) => {
                                draft.push(assignmetnAdded);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        editAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data: assignmentEdited } = await queryFulfilled;
                    //pessimistic cache update
                    if (assignmentEdited?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getAssignments", undefined,
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, assignmentEdited);
                                    }
                                })
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getAssignmentById", assignmentEdited.id.toString(),
                            (draft) => {
                                Object.assign(draft, assignmentEdited);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        deteleAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            draft = draft.filter(x => {
                                if (x.id == arg) {
                                    return false;
                                } else {
                                    return true;
                                }
                            });
                            return draft;
                        }
                    ));
                try {
                    await queryFulfilled;
                } catch {
                    deleteResult.undo()
                }
            }
        }),

        getAllAssignmentMark: builder.query({
            query: () =>
                '/assignmentMark',
        }),

        getStudentAssignmentMark: builder.query({
            query: (studentId) =>
                `/assignmentMark?student_id=${studentId}`,
        }),

        getVideoRelatedAssignmentMark: builder.query({
            query: (addignmentId) =>
                `/assignmentMark?assignment_id=${addignmentId}`,
        }),

        addAssignmentSubmission: builder.mutation({
            query: (data) => ({
                url: "/assignmentMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: assignmentSubmitted } = await queryFulfilled;

                    //pessimistic cache update
                    if (assignmentSubmitted?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getStudentAssignmentMark", arg.student_id,
                            (draft) => {
                                draft.push(assignmentSubmitted);
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getAllAssignmentMark", undefined,
                            (draft) => {
                                draft.push(assignmentSubmitted);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        editStudentAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data: editedAssignmentMark } = await queryFulfilled;
                    //pessimistic cache update
                    if (editedAssignmentMark?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getAllAssignmentMark", undefined,
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, editedAssignmentMark);
                                    }
                                })
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getStudentAssignmentMark", editedAssignmentMark.student_id.toString(),
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, editedAssignmentMark);
                                    }
                                })
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        deleteAssignmentMarks: builder.mutation({
            query: (id) => ({
                url: `/assignmentMark/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const deleteAllResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAllAssignmentMark",
                        undefined,
                        (draft) => {
                            draft = draft.filter(x => {
                                if (x.id == arg) {
                                    return false;
                                } else {
                                    return true;
                                }
                            });
                            return draft;
                        }
                    ));

                try {
                    await queryFulfilled;
                } catch {
                    deleteAllResult.undo();
                }
            }
        }),
    }),
});

export const {
    useGetAssignmentsQuery,
    useGetAssignmentQuery,
    useGetAssignmentByIdQuery,
    useAddAssignmentMutation,
    useEditAssignmentMutation,
    useDeteleAssignmentMutation,
    useGetAllAssignmentMarkQuery,
    useGetStudentAssignmentMarkQuery,
    useGetVideoRelatedAssignmentMarkQuery,
    useAddAssignmentSubmissionMutation,
    useEditStudentAssignmentMarkMutation,
} = assignmentApi;
