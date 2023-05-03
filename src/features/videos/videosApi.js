import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentApi";
import { quizApi } from "../quiz/quizApi";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () =>
                "/videos",
        }),

        getVideo: builder.query({
            query: (id) =>
                `/videos/${id}`,
        }),

        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: videoAdded } = await queryFulfilled;
                    //pessimistic cache update
                    if (videoAdded?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getVideos", undefined,
                            (draft) => {
                                draft.push(videoAdded);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data: videoEdited } = await queryFulfilled;
                    //pessimistic cache update
                    if (videoEdited?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getVideos", undefined,
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, videoEdited);
                                    }
                                })
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getVideo", videoEdited.id.toString(),
                            (draft) => {
                                Object.assign(draft, videoEdited);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),

        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getVideos",
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
                    /* 
                    // if video is deleted the corresponding quiz and assignments should also be deleted.
                    const { meta } = await queryFulfilled;

                    if (meta.response.status === 200) {
                        //deleting all quiz marks related to deleted video
                        const relatedQuizMarks = await dispatch(
                            quizApi.endpoints.getVideoRelatedQuizMarks.initiate(arg)
                        ).unwrap();

                        if (relatedQuizMarks?.lenngth > 0) {
                            relatedQuizMarks?.forEach(async element => {
                                await dispatch(quizApi.endpoints.deleteQuizMarks.initiate(element?.id)).unwrap();
                            });
                        }

                        //deleting all quiz related to deleted video
                        const relatedQuiz = await dispatch(
                            quizApi.endpoints.getRelatedQuiz.initiate(arg)
                        ).unwrap();

                        if (relatedQuiz?.length > 0) {
                            relatedQuiz?.forEach(async element => {
                                await dispatch(quizApi.endpoints.deleteQuiz.initiate(element?.id)).unwrap();
                            });
                        }

                        //deleting Assignments Marks related to deleted video
                        const reletedAssignment = await dispatch(
                            assignmentApi.endpoints.getAssignment.initiate(arg)
                        ).unwrap();

                        const reletedAssignmentMarks = await dispatch(
                            assignmentApi.endpoints.getVideoRelatedAssignmentMark.initiate(reletedAssignment[0]?.id)
                        ).unwrap();
                        if (reletedAssignmentMarks?.length > 0) {
                            reletedAssignmentMarks.forEach(async element => {
                                await dispatch(assignmentApi.endpoints.deleteAssignmentMarks.initiate(element?.id)).unwrap();
                            })
                        }

                        //deleting Assignments related to deleted video
                        if (reletedAssignment?.length > 0) {
                            reletedAssignment?.forEach(async element => {
                                await dispatch(assignmentApi.endpoints.deteleAssignment.initiate(element?.id)).unwrap();
                            });
                        }

                    }
                     */
                } catch {
                    deleteResult.undo();
                }
            }
        }),

    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useEditVideoMutation,
    useAddVideoMutation,
    useDeleteVideoMutation
} = videosApi;
