import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import notificationSound from "../assets/sounds/notification.mp3"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  const sendMessage = async (message) => {
    try {
      setLoading(true)

      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      )
      const sound = new Audio(notificationSound)
      sound.play()

      const data = await res.json()

      if (data.statusCode) {
        throw new Error(data.message)
      }
      setMessages([...messages, data])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage
