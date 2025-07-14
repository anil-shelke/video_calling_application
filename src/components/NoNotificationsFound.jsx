import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div
        className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-light"
        style={{ width: "64px", height: "64px" }}
      >
        <BellIcon size={32} className="text-muted" />
      </div>
      <h3 className="h6 fw-semibold mb-2">No notifications yet</h3>
      <p className="text-muted" style={{ maxWidth: "400px" }}>
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;
