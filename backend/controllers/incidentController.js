const Incident = require('../models/Incident');

const PRIORITY_WEIGHTS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4
};

// @route   POST /api/incidents
// @access  Private (REPORTER)
const createIncident = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const incident = await Incident.create({
      title,
      description,
      priority,
      createdBy: req.user._id,
    });

    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/incidents/my
// @access  Private (REPORTER)
const getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/incidents
// @access  Private (RESOLVER)
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/incidents/:id
// @access  Private (RESOLVER)
const updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const { status, priority } = req.body;

    // Check priority downgrade rule
    if (priority && priority !== incident.priority) {
      if (PRIORITY_WEIGHTS[priority] < PRIORITY_WEIGHTS[incident.priority]) {
        return res.status(400).json({ 
          message: `Cannot downgrade priority. Current: ${incident.priority}, Requested: ${priority}` 
        });
      }
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  updateIncident,
};
