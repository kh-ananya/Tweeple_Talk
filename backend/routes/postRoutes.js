import  express  from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { createPost,deletePost,commentOnPost,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPost,getUserPost } from '../controllers/postContoller.js';

const router = express.Router()

router.post("/create",protectRoute,createPost)
router.post("/like/:id",protectRoute,likeUnlikePost)
router.post("/comment/:id",protectRoute,commentOnPost)
router.delete("/:id",protectRoute,deletePost)
router.get("/all",protectRoute,getAllPosts)
router.get("/likedpost/:id",protectRoute,getLikedPosts)
router.get("/following",protectRoute,getFollowingPost)
router.get("/userpost/:username",protectRoute,getUserPost)


export default router