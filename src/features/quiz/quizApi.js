import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () =>
                "/quizzes",
        }),

        getRelatedQuiz: builder.query({
            query: (videoId) =>
                `/quizzes?video_id=${videoId}`,
        }),

        getQuizById: builder.query({
            query: (quizId) =>
                `/quizzes/${quizId}`,
        }),

        addNewQuiz: builder.mutation({
            query: (data) => ({
                url: "/quizzes",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newQuiz } = await queryFulfilled;
                    //pessimistic cache update
                    if (newQuiz?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getQuizzes", undefined,
                            (draft) => {
                                draft.push(newQuiz);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        editQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data: editedQuiz } = await queryFulfilled;
                    //pessimistic cache update
                    if (editedQuiz?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getQuizzes", undefined,
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, editedQuiz);
                                    }
                                })
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getQuizById", editedQuiz.id.toString(),
                            (draft) => {
                                Object.assign(draft, editedQuiz);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getQuizzes",
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

        getAllQuizMarks: builder.query({
            query: () =>
                '/quizMark',
        }),

        getRelatedQuizMarks: builder.query({
            query: (studentId) =>
                `/quizMark?student_id=${studentId}`,
        }),

        getVideoRelatedQuizMarks: builder.query({
            query: (videoId) =>
                `/quizMark?video_id=${videoId}`,
        }),

        addQuizMarks: builder.mutation({
            query: (data) => ({
                url: "/quizMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: quizMarkSubmitted } = await queryFulfilled;
                    //pessimistic cache update
                    if (quizMarkSubmitted?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getRelatedQuizMarks", arg.student_id,
                            (draft) => {
                                draft.push(quizMarkSubmitted);
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getAllQuizMarks", undefined,
                            (draft) => {
                                draft.push(quizMarkSubmitted);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        deleteQuizMarks: builder.mutation({
            query: (id) => ({
                url: `/quizMark/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetQuizzesQuery,
    useGetRelatedQuizQuery,
    useGetQuizByIdQuery,
    useAddNewQuizMutation,
    useEditQuizMutation,
    useDeleteQuizMutation,
    useGetAllQuizMarksQuery,
    useGetRelatedQuizMarksQuery,
    useGetVideoRelatedQuizMarksQuery,
    useAddQuizMarksMutation,
} = quizApi;
