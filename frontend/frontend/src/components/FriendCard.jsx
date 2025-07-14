import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card shadow-sm text-white" style={{ backgroundColor: "#242428" }}>
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={friend.profilePic}
            alt={friend.fullName}
            className="rounded-circle"
            width="48"
            height="48"
          />
          <h6 className="mb-0 text-truncate">{friend.fullName}</h6>
        </div>

        {/* Languages */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-secondary text-white text-small">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge border border-secondary text-secondary text-small">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Chat Button */}
        <Link to={`/chat/${friend._id}`} className="btn btn-outline-primary w-100">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="me-1"
        style={{ height: "14px", verticalAlign: "text-bottom" }}
      />
    );
  }
  return null;
}
