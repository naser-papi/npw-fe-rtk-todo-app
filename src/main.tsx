import React from "react"
import ReactDOM from "react-dom/client"
import "@/index.css"
import App from "./app.tsx" // if your App is at src/app.tsx keep as "./App"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { Toaster } from "@/components/ui/sonner"

async function enableMocking() {
    if (import.meta.env.DEV) {
        const { worker } = await import("@/mocks/browser")
        await worker.start({ onUnhandledRequest: "bypass" })
    }
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
                <Toaster richColors position="top-right" />
            </Provider>
        </React.StrictMode>
    )
})
