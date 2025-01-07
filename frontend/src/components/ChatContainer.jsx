import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {

const{messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages}=useChatStore();
const {authUser}=useAuthStore();
const messageRef = useRef(null);

useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();
    return ()=>unsubscribeFromMessages();
},[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

useEffect(()=>{
  if(messageRef.current && messages){
  messageRef.current.scrollIntoView({behavior:"smooth"});
  }
},[messages])

if(isMessagesLoading)return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
)
// console.log(messages);


  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message)=>(
          <div key={message._id}
          ref={messageRef}
          className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId===authUser._id?authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img
                src={message.image}
                alt="attachment"
                className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div> 
        ))}
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer