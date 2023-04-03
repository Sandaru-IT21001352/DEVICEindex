import express from 'express';
import {getAllDevices,deleteDevice,updateDevice} from '../controllers/device.js';
const router = express.Router();
// GET /api/:LocationID/devices
// POST /api/:LocationID/device
// DELTE /api/:LocationID/device/:id
// PUT /api/:LocationID/device/:id

//todo remove
router.get('/', getAllDevices);
router.delete('/:locationId/:deviceId', deleteDevice);
router.put('/:locationId/:deviceId', updateDevice);


export default router;