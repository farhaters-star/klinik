import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "../components/skeleton/MessageSkeleton"
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';


const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessage,unSubscribeFromMessage } = useChatStore();
  const {authUser} = useAuthStore()
  const messageEndRef = useRef(null)
  useEffect(() => {
    if (!selectedUser) return;
  
    getMessages(selectedUser._id);
    subscribeToMessage();
  
    return () => unSubscribeFromMessage();
  }, [selectedUser]);  // Hanya dependensi `selectedUser`
  

  useEffect(() => {
    if (messageEndRef.current) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay agar render selesai sebelum scroll
    }
  }, [messages.length]); // Gunakan `messages.length` agar hanya update saat jumlah pesan berubah
  

  if (isMessagesLoading){ 
    return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )
};

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          ref={messageEndRef}
          >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png": selectedUser.profilePic ||"avatar.png"} alt="profile pic" />
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image &&(
                  <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2'/>
                )}
              {message.text && <p>{message.text}</p>}
              </div>
          </div>
          
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
