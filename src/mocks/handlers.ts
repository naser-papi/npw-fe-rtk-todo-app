import { http, HttpResponse } from "msw"

let tasks = [
    { id: "1", title: "Wire dashboard", done: false, priority: "high",   createdAt: Date.now() - 40000 },
    { id: "2", title: "Write tests",    done: false, priority: "medium", createdAt: Date.now() - 30000 },
    { id: "3", title: "Fix styles",     done: true,  priority: "low",    createdAt: Date.now() - 20000 },
]

export const handlers = [
    http.get("/api/tasks", () => HttpResponse.json(tasks)),

    http.post("/api/tasks", async ({ request }) => {
        const body = (await request.json()) as { title: string; priority: "low"|"medium"|"high" }
        const t = { id: crypto.randomUUID(), title: body.title, done: false, priority: body.priority, createdAt: Date.now() }
        await new Promise(r => setTimeout(r, 500))
        tasks = [t, ...tasks]
        return HttpResponse.json(t, { status: 201 })
    }),

    http.patch("/api/tasks/:id/toggle", async ({ params }) => {
        const id = params.id as string
        const i = tasks.findIndex(t => t.id === id)
        if (i !== -1) tasks[i] = { ...tasks[i], done: !tasks[i].done }
        await new Promise(r => setTimeout(r, 400))
        return HttpResponse.json({ id, done: tasks[i]?.done ?? false })
    }),

    http.delete("/api/tasks/:id", async ({ params }) => {
        const id = params.id as string
        tasks = tasks.filter(t => t.id !== id)
        await new Promise(r => setTimeout(r, 300))
        return HttpResponse.json({ id })
    }),
]
