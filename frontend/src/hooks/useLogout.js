import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const logout = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()

      if (data.statusCode) {
        throw new Error(data.message)
      }
      localStorage.removeItem("user")

      toast(data.message, {
        duration: 3000, // Duration in milliseconds
        style: {
          background: "green",
          color: '#fff',
        },
        icon: '🔓',
      });
      
      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogout
