import { Router } from 'express';
import {authz,ValidateGig} from "../middlewares/gigs.middleware"
import {getEntireGigs,deleteGigs,updateGigs,createGig,filterAndSearchGig} from "../controllers/gigs.controller"

const router = Router();


router.get("/gig",filterAndSearchGig)
router.get("/gig",getEntireGigs)
router.delete("/gig/:id",deleteGigs)
router.patch("/gig/:id",ValidateGig,updateGigs)
router.post("/gig",ValidateGig,createGig)




export default router