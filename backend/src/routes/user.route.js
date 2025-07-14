import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFreinds, getOutgoingFriendReqs, getRecommandedUsers, sendFriendRequest } from "../controller/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/",getRecommandedUsers);
router.get("/friends", getMyFreinds);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-request", getFriendRequests);

router.get("/outgoing-friend-request",getOutgoingFriendReqs);

export default router

