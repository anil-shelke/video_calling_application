import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div
      className="position-absolute top-0 w-100 d-flex justify-content-end align-items-center border-bottom p-3"
      style={{ maxWidth: "1140px", margin: "0 auto" }} // Bootstrap's container-xl is approx 1140px
    >
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
        <VideoIcon size={24} /> {/* Bootstrap equivalent for size-6 (1.5rem = 24px) */}
      </button>
    </div>
  );
}

export default CallButton;
