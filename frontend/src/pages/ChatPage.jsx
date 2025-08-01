import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useAuthUser from "../hooks/useAuthUser"
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { StreamChat } from 'stream-chat'
import toast from "react-hot-toast"


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window
} from "stream-chat-react";
import { getStreamToken } from '../lib/api'

import ChatLoader from '../components/ChatLoader'
import CallButton from "../components/CallButton";

const ChatPage = () => {

  const {id:targetUserId} = useParams();
  // console.log(id);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const {authUser} = useAuthUser();

  const {data:tokenData} = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser   // this will run only when authUser is available
  })

  useEffect(() => {
    const initChat = async () => {
      if(!tokenData?.token || !authUser)  return ;

      try {
        console.log("Initializing stream chat client...")

        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token)

        const channelId = [authUser._id, targetUserId].sort().join("-");

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId] => [myId, yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]
        })

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initializing chat:",error);
        toast.error("Could not connect to chat. Please try again.");
      }
      finally{
        setLoading(false);
      }
    }

    initChat();
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = () => {
    if(channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call, Join me here: ${callUrl}`,
      })

      toast.success("Video call link sent successfully!");
    }
  }

  if(loading || !chatClient || !channel) return <ChatLoader />;

  return (
 <div className="container-fluid p-0 m-0">
  <div className="d-flex" style={{ height: "93vh", width: "100vw" }}>
    <div className="flex-grow-1 w-100">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-100 position-relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  </div>
</div>



);

}

export default ChatPage
