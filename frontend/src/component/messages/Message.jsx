import { useAuthContext } from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation"
import { formatTime } from "../../utils/formatTime"
import defaultMale from "../../assets/user/boy.png"
import defaultFemale from "../../assets/user/girl.png"
import { useEffect, useState } from "react"

const Message = ({ message }) => {
  // console.log(message)
  const { authUser } = useAuthContext()

  const { selectedConversation } = useConversation()

  const messageFromMe = message.senderId === authUser._id

  const chatClassName = messageFromMe ? "chat-end" : "chat-start"

  //Set Image
  const senderDefaultPic = authUser.gender === "male" ? defaultMale : defaultFemale
  const receiverDefaultPic = selectedConversation.gender === "male" ? defaultMale : defaultFemale

  //Profile Image
  const profilePic = messageFromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic

  //Default Image
  const defaultPic = messageFromMe
    ? senderDefaultPic
    : receiverDefaultPic

  const [imageSrc, setImageSrc] = useState(defaultPic);

  useEffect(() => {
    // Create an image object to handle loading and error events
    const img = new Image();
    img.src = profilePic;

    img.onload = () => {
      // If the image loads successfully, update the source
      setImageSrc(profilePic);
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


  const msgBgColor = messageFromMe ? "bg-green-500" : ""

  const formattedTime = formatTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={imageSrc} alt="User Avatar" />
        </div>
      </div>

      <div className={`chat-bubble text-white ${msgBgColor}`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-slate-950">
        {formattedTime}
      </div>
    </div>
  )
}

export default Message