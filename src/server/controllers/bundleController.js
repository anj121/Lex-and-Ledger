import Bundle from '../models/Bundle.js';

// GET all bundles
export const getAllBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find().sort({ createdAt: -1 });
    res.status(200).json({ bundles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE bundle
export const createBundle = async (req, res) => {
  try {
    const bundle = await Bundle.create(req.body);
    res.status(201).json({ bundle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE bundle
export const updateBundle = async (req, res) => {
  try {
    const bundle = await Bundle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ bundle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE bundle
export const deleteBundle = async (req, res) => {
  try {
    const bundle = await Bundle.findByIdAndDelete(req.params.id);

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ message: 'Bundle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
