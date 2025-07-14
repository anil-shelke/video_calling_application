import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <LoaderIcon className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }} />
      <p className="mt-4 text-center fs-5 font-monospace">Connecting to chat...</p>
    </div>
  );
}

export default ChatLoader;
