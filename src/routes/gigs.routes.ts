import { Router } from 'express';
import {ValidateGig} from "../middlewares/gigs.middleware"
import { authz,authzClients} from '../middlewares/authzMiddleware'
import {getEntireGigs,deleteGigs,updateGigs,createGig,filterAndSearchGig} from "../controllers/gigs.controller"
import {addFavorite} from "../controllers/favorites.controller"
const router = Router();


router.get("/gig/search",filterAndSearchGig)
/**
 * @swagger
 * /freelance/gig/search:
 *   get:
 *     summary: Filter gigs according to Category,Title,FreelancerName or Price
 *     tags: 
 *       - Gigs
 *     parameters:
 *       - in: query
 *         name: Category
 *         schema:
 *           type: string
 *         description: Filter by Category 
 *       - in: query
 *         name: Title
 *         schema:
 *           type: string
 *         description: Title of the gig
 *       - in: query
 *         name: FreelancerName
 *         schema:
 *           type: string
 *         description: Owner of the gig
 *       - in: query
 *         name: PriceMin
 *         schema:
 *           type: number
 *         description: Minimum Price constraint
 *       - in: query
 *         name: PriceMax
 *         schema:
 *           type: number
 *         description: Maximum Price constraint
 *     responses:
 *       200:
 *         description: Filtered gigs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gigs'
 *       400:
 *         description: Bad request
 */
router.get("/gig",getEntireGigs)
router.post("/gig",authz,ValidateGig,createGig)
/**
 * @swagger
 * /freelance/gig:
 *   get:
 *     tags: 
 *       - Gigs
 *     summary: return all the gigs
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigs'
 *       400:
 *         description: Bad request
 *   post:
 *     summary: create a new gig
 *     tags: 
 *       - Gigs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gigs'
 *     responses:
 *       201:
 *         description: gig created successfully
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden 
 */

router.delete("/gig/:id",authz,deleteGigs)
router.patch("/gig/:id",authz,ValidateGig,updateGigs)
/**
 * @swagger
 * /freelance/gig/{id}:
 *   delete:
 *     tags: 
 *       - Gigs
 *     summary: delete gig by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *         description: ID of the gig 
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found 
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden 
 *   patch:
 *     tags: 
 *       - Gigs
 *     summary: update gig by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *         description: ID of the gig
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Category:
 *                 type: string
 *               Price:
 *                 type: number
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string       
 *             example:
 *               Title: "Responsive React & TypeScript Landing Page"
 *               Description: "Building fully responsive, clean, and interactive single-page applications using React, TypeScript, and Tailwind CSS with fast rendering performance."
 *               Price: 85
 *               Category: "Web Development"
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigs'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found   
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden     
 */

router.patch("/gig/favorite/:id",authzClients,addFavorite)
/**
 * @swagger
 * /freelance/gig/favorite/{id}:
 *   patch:
 *     tags: 
 *       - Gigs
 *     summary: add favorites to a user's favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *         description: ID of the gig     
 *         example:
 *           gigId: "65abc1234567890abcdef123"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found   
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden     
 */


export default router