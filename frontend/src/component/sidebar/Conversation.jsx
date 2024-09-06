import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zustand/useConversation"
import defaultMale from "../../assets/user/boy.png"
import defaultFemale from "../../assets/user/girl.png"
import { useEffect, useState } from "react"

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  //Set Image
  const defaultPic = conversation.gender == "male" ? defaultMale : defaultFemale
  const [imageSrc, setImageSrc] = useState(defaultPic);

  useEffect(() => {
    // Create an image object to handle loading and error events
    const img = new Image();
    img.src = conversation.profilePic;

    img.onload = () => {
      // If the image loads successfully, update the source
      setImageSrc(conversation.profilePic);
    };

    img.onerror = () => {
      // If the image fails to load, keep the default image
      setImageSrc(defaultPic);
    };

    // Cleanup function to avoid memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

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
              alt="Profile"
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
