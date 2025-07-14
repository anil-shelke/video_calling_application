import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, {useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api'
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router";

import NoFriendsFound from '../components/NoFriendsFound.jsx'
import FriendCard, { getLanguageFlag } from '../components/FriendCard.jsx';
import { capitialize } from '../lib/utils.js';

const HomePage = () => {

  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

  const {data: friends=[], isLoading: loadingFriends} = useQuery({
      queryKey: ["friends"],
      queryFn: getUserFriends
  })

  const {data: recommendedUsers=[], isLoading:{loadingUsers}} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers
  })

  const {data: outgoingFriendReqs} = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const {mutate: sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    // onSuccess: () => queryClient.invalidateQueries({queryKey: ["outgoingFriendReqs"]})
    onSuccess: (_, userId) => {
    // Optimistically add userId to outgoingRequestsIds
    setOutgoingRequestsIds((prev) => new Set(prev).add(userId));
    // Then refetch from server to stay in sync
    queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
  }
  })

  useEffect(() =>{
    const outgoingIds = new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length > 0){
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  },[outgoingFriendReqs])
    
  return (
  <div className="p-4">
    <div className="container py-4">
      {/* Friends Section Header */}
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
        <h2 className="h3 fw-bold">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline-secondary btn-sm d-flex align-items-center">
          <UsersIcon className="me-2" size={16} />
          Friend Requests
        </Link>
      </div>

      {/* Friends Loading State */}
      {loadingFriends ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="row g-3">
          {friends.map((friend) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={friend._id}>
              <FriendCard friend={friend} />
            </div>
          ))}
        </div>
      )}

      {/* Suggested Users Section */}
      <section className="mt-5">
        <div className="mb-4">
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
            <div>
              <h2 className="h3 fw-bold">Meet New Learners</h2>
              <p className="">Discover perfect language exchange partners based on your profile</p>
            </div>
          </div>
        </div>

        {/* Suggested Users Loading State */}
        {loadingUsers ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <div className="card p-4 text-center">
            <h5 className="fw-semibold mb-2">No recommendations available</h5>
            <p className="">Check back later for new language partners!</p>
          </div>
        ) : (
          <div className="row g-4">
            {recommendedUsers.map((user) => {
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

              return (
                <div className="col-12 col-md-6 col-lg-4 text-white" key={user._id}>
                  <div className="card h-100 shadow-sm " style={{ backgroundColor: "#242428" }}>
                    <div className="card-body d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="rounded-circle"
                          width={64}
                          height={64}
                        />
                        <div>
                          <h5 className="mb-0 text-white">{user.fullName}</h5>
                          {user.location && (
                            <small className="text-white d-flex align-items-center mt-1">
                              <MapPinIcon className="me-1 text-white" size={12} />
                              {user.location}
                            </small>
                          )}
                        </div>
                      </div>

                      {/* Languages with flags */}
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-secondary">
                          {getLanguageFlag(user.nativeLanguage)} Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="badge border border-secondary text-secondary">
                          {getLanguageFlag(user.learningLanguage)} Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && <p className="text-white small">{user.bio}</p>}

                      {/* Action Button */}
                      <button
                        className={`btn w-100 mt-auto ${
                          hasRequestBeenSent ? "btn-secondary disabled" : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="me-2" size={16} />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="me-2" size={16} />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  </div>
);

}

export default HomePage
