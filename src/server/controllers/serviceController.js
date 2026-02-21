import Service from '../models/Service.js';

/**
 * GET /services
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

/**
 * POST /services
 */
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to create service'
    });
  }
};
/**
 * GET /services/:id
 */
export const getServiceById = async (req, res) => {
  try {
    console.log(req.params.id);
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ service });
  } catch (error) {
    res.status(400).json({
      message: 'Invalid service ID or failed to fetch service'
    });
  }
};

/**
 * PUT /services/:id
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to update service'
    });
  }
};

/**
 * DELETE /services/:id
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
