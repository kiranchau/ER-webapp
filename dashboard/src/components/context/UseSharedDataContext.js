import { useContext } from "react"
import SharedDataContext from "./SharedDataContext"

const UseSharedDataContext = () => {
    return useContext(SharedDataContext)
}
export default UseSharedDataContext