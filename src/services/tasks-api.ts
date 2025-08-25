import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type Task = {
    id: string
    title: string
    done: boolean
    priority: "low" | "medium" | "high"
    createdAt: number
}

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Task"],
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => "/tasks",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((t) => ({ type: "Task" as const, id: t.id })),
                        { type: "Task" as const, id: "LIST" },
                    ]
                    : [{ type: "Task" as const, id: "LIST" }],
        }),
        addTask: build.mutation<Task, Pick<Task, "title" | "priority">>({
            query: (body) => ({ url: "/tasks", method: "POST", body }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // optimistic add
                const patch = dispatch(
                    tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
                        draft.unshift({
                            id: "tmp-" + Math.random().toString(36).slice(2),
                            title: arg.title,
                            priority: arg.priority,
                            done: false,
                            createdAt: Date.now(),
                        })
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patch.undo()
                }
            },
            invalidatesTags: [{ type: "Task", id: "LIST" }],
        }),
        toggleTask: build.mutation<{ id: string; done: boolean }, { id: string }>({
            query: ({ id }) => ({ url: `/tasks/${id}/toggle`, method: "PATCH" }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                // optimistic toggle
                const patch = dispatch(
                    tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
                        const t = draft.find((x) => x.id === id)
                        if (t) t.done = !t.done
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patch.undo()
                }
            },
            invalidatesTags: (_r, _e, arg) => [{ type: "Task", id: arg.id }],
        }),
        deleteTask: build.mutation<{ id: string }, { id: string }>({
            query: ({ id }) => ({ url: `/tasks/${id}`, method: "DELETE" }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                // optimistic delete
                const patch = dispatch(
                    tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
                        const i = draft.findIndex((x) => x.id === id)
                        if (i !== -1) draft.splice(i, 1)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patch.undo()
                }
            },
            invalidatesTags: (_r, _e, arg) => [{ type: "Task", id: arg.id }],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useToggleTaskMutation,
    useDeleteTaskMutation,
} = tasksApi
