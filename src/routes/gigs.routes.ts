import { Router } from 'express';
import {ValidateGig} from "../middlewares/gigs.middleware"
import { authz } from '../middlewares/authzMiddleware'
import {getEntireGigs,deleteGigs,updateGigs,createGig,filterAndSearchGig} from "../controllers/gigs.controller"
import {addFavorite} from "../controllers/favorites.controller"
const router = Router();


router.get("/gig/search",filterAndSearchGig)
router.get("/gig",getEntireGigs)
router.delete("/gig/:id",authz,deleteGigs)
router.patch("/gig/:id",authz,ValidateGig,updateGigs)
router.post("/gig",authz,ValidateGig,createGig)
router.patch("/gig/favorite/:id",addFavorite)



export default router