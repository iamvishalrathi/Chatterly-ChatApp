import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/messages/${selectedConversation._id}`)

        const data = await res.json()

        if (data.statusCode) {
          throw new Error(data.message)
        }
          setMessages(data) //We didn't de-constructed "messages" as
          //we don't wanna call useEffect() on storing fetched data
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?._id) { //To prevent useEffect() being called first
      // time on loading the page
      getMessages()
    }
  }, [selectedConversation._id, setMessages])

  return { messages, loading }
}

export default useGetMessages
