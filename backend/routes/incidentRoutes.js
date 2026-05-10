const express = require('express');
const router = express.Router();
const {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  updateIncident,
} = require('../controllers/incidentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('REPORTER'), createIncident);
router.get('/my', protect, authorize('REPORTER'), getMyIncidents);
router.get('/', protect, authorize('RESOLVER'), getAllIncidents);
router.put('/:id', protect, authorize('RESOLVER'), updateIncident);

module.exports = router;
