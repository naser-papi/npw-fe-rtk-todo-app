import { useRef } from "react"

export const RenderCounter = () => {
    const ref = useRef(0)
    ref.current += 1
    return (
        <div className="text-xs text-neutral-500">
            Renders: <span className="font-mono">{ref.current}</span>
        </div>
)
}
