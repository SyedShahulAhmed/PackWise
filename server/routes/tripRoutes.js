import express from 'express';
import {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
  updateTrip,
  addItemToTrip,
  removeItemFromTrip,
  updateItemInTrip,
  toggleItemPackedStatus
} from '../controllers/tripController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Trip routes
router.post('/', authMiddleware, createTrip);
router.get('/', authMiddleware, getUserTrips);
router.get('/:id', authMiddleware, getTripById);
router.delete('/:id', authMiddleware, deleteTrip);
router.put('/:id', authMiddleware, updateTrip);

// Item routes
router.put('/items/:id', authMiddleware, addItemToTrip);                 // Add item
router.delete('/items/:tripId/:itemId', authMiddleware, removeItemFromTrip); // Remove item
router.put('/items/:tripId/update/:itemId', authMiddleware, updateItemInTrip);
router.patch('/items/:tripId/:itemId/toggle', authMiddleware, toggleItemPackedStatus);

export default router;
