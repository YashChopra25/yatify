import { useEffect, useState } from "react";
type useDebouncerhook = (value: string, delay: number) => string
const useDebouncerhook: useDebouncerhook = (value = "", delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timer)

    }, [value, delay])
    return debouncedValue
}
export default useDebouncerhook