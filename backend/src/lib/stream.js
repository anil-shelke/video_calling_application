import {StreamChat}  from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STEM_API_KEY;
const apiSecret = process.env.STEM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream API key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Error upserting Stream user:", error)
    }
}


export const generateStreamToken = (userId) => {
    try {
        // ensure userId is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.error("Error generating stream token", error)
    }
};
