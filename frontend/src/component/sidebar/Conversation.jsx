import userAvatar from "../../assets/user.png"
import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zustand/useConversation"
import defaultPic from "../../assets/user/boy.png"
import { useState } from "react"

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  //Avatar Image
  const [imageSrc, setImageSrc] = useState(conversation.profilePic || defaultPic);

  // Handle image loading error
  const handleError = () => {
    setImageSrc(defaultPic);
  };


  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""
          }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={imageSrc}
              alt="User Avatar"
              onError={handleError} // Fallback to default image on error
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-slate-700">{conversation.username}</p>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  )
}

export default Conversation
