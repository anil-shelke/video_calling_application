import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api';
import NoNotificationsFound from '../components/NoNotificationsFound.jsx'

const NotificationsPage = () => {

  const queryClient = useQueryClient();
  
  const {data: friendRequests, isLoading} = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const {mutate: acceptRequestMutation, isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["friendRequests"]});
      queryClient.invalidateQueries({queryKey: ["friends"]})
    }
  })

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
  <div className="p-4">
    <div className="container max-w-4xl py-4">
      <h1 className="h3 mb-4 fw-bold">Notifications</h1>

      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          {incomingRequests.length > 0 && (
            <section className="mb-5">
              <h2 className="h5 fw-semibold d-flex align-items-center mb-3">
                <i className="bi bi-person-check-fill text-primary me-2"></i>
                Friend Requests
                <span className="badge bg-primary ms-2">{incomingRequests.length}</span>
              </h2>

              <div className="d-grid gap-3" >
                {incomingRequests.map((request) => (
                  <div key={request._id} className="card shadow-sm">
                    <div className="card-body p-3 text-white" style={{ backgroundColor: "#242430" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                            className="rounded-circle me-3"
                            style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                          />
                          <div>
                            <h5 className="mb-1">{request.sender.fullName}</h5>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-secondary small">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="badge border text-white small">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {acceptedRequests.length > 0 && (
            <section className="mb-5">
              <h2 className="h5 fw-semibold d-flex align-items-center mb-3">
                <i className="bi bi-bell-fill text-success me-2"></i>
                New Connections
              </h2>

              <div className="d-grid gap-3">
                {acceptedRequests.map((notification) => (
                  <div key={notification._id} className="card shadow-sm text-white" style={{ backgroundColor: "#242428" }}>
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start gap-3">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="mb-1">{notification.recipient.fullName}</h5>
                          <p className="mb-1 small">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <div className="text-muted small d-flex align-items-center">
                            <i className="bi bi-clock me-1"></i>
                            Recently
                          </div>
                        </div>
                        <span className="badge bg-success d-flex align-items-center">
                          <i className="bi bi-chat-dots me-1"></i>
                          New Friend
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
            <NoNotificationsFound />
          )}
        </>
      )}
    </div>
  </div>
);

}

export default NotificationsPage
