import express from 'express';
import {getLocation,createLocation,getAllLocations,deleteLocation,updateLocation} from '../controllers/location.js';
const router = express.Router();
//GET /api/location
// POST /api/location
// DELTE /api/location/:id
// PUT /api/location/:id

router.get('/', getAllLocations);
router.post('/', createLocation);
router.get('/:id', getLocation);
router.delete('/:id', deleteLocation);
router.put('/:id', updateLocation);

export default router;