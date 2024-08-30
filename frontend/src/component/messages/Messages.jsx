import { useEffect, useRef } from "react"
import Message from "./Message"
import useGetMessages from "../../hooks/useGetMessages"
import useListenMessages from "../../hooks/useListenMessages"

const Messages = () => {
  const { messages, loading } = useGetMessages()

  // console.log(messages)

  useListenMessages()

  const lastMessageRef = useRef() //This is a React Hook that returns a 
  // mutable ref object. This ref object has a current property that can hold a 
  // reference to a DOM element or a value that persists across re-renders.


  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" }) //This method scrolls the referenced element into view.
    })
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length === 0 && (
        <p className="text-center">Start conversation by sending a message</p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && <div className="w-full flex justify-center"><div className="loading loading-spinner"></div></div>}
    </div>
  )
}

export default Messages