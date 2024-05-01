import  express  from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { createPost,deletePost,commentOnPost,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPost,getUserPost } from '../controllers/postContoller.js';

const router = express.Router()

router.get("/all",protectRoute,getAllPosts)
router.get("/following",protectRoute,getFollowingPost)
router.get("/likes/:id",protectRoute,getLikedPosts)
router.get("/user/:username",protectRoute,getUserPost)
router.post("/create",protectRoute,createPost)
router.post("/like/:id",protectRoute,likeUnlikePost)
router.post("/comment/:id",protectRoute,commentOnPost)
router.delete("/:id",protectRoute,deletePost)


export default router