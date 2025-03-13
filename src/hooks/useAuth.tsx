import { use } from "react"

import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
    const context = use(AuthContext)

    return context
}