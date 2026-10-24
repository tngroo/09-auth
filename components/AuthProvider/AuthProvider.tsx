'use client'
import { checkSession, getMe } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect } from "react"

interface Props {
    children: React.ReactNode
}
const AuthProvider = ({children} : Props) =>{
const setUser = useAuthStore((state)=> state.setUser)
const clearUser = useAuthStore((state) =>state.clearIsAuthenticated)

useEffect(()=> {
    const fetchSession = async () => {
        const isAuth = await checkSession()
        if (isAuth){
            const user = await getMe()
            setUser(user)
        } else {
            clearUser()
        }
    }
    fetchSession()
}, [clearUser, setUser])
return children
}

export default AuthProvider