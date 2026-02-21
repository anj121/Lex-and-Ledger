import Service from '../models/Service.js'
import Admin from '../models/Admin.js'

// @desc    Get dashboard statistics
// @route   GET /api/data/dashboard
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ status: 'active' });
    const inactiveServices = await Service.countDocuments({ status: 'inactive' });
    const totalAdmins = await Admin.countDocuments();

    // Get services by category
    const servicesByCategory = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          inactive: {
            $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get recent services
    const recentServices = await Service.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get services created in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentServicesCount = await Service.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get admin activity
    const activeAdmins = await Admin.countDocuments({ isActive: true });
    const lastLoginAdmins = await Admin.find({ lastLogin: { $exists: true } })
      .sort({ lastLogin: -1 })
      .limit(5)
      .select('username email lastLogin');

    res.status(200).json({
      success: true,
      stats: {
        overview: {
          totalServices,
          activeServices,
          inactiveServices,
          totalAdmins,
          activeAdmins,
          recentServicesCount
        },
        servicesByCategory,
        recentServices,
        adminActivity: {
          activeAdmins,
          lastLoginAdmins
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
};

// @desc    Get all services with advanced filtering
// @route   GET /api/data/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const {
      category,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
      dateFrom,
      dateTo
    } = req.query;

    // Build query
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { features: { $regex: search, $options: 'i' } }
      ];
    }

    // Date range filtering
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query.createdAt.$lte = new Date(dateTo);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const services = await Service.find(query)
      .populate('createdBy', 'username email')
      .populate('updatedBy', 'username email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Service.countDocuments(query);

    // Get aggregation data
    const categoryStats = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      services,
      categoryStats,
      filters: {
        category,
        status,
        search,
        sortBy,
        sortOrder,
        dateFrom,
        dateTo
      }
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching services'
    });
  }
};

// @desc    Get service analytics
// @route   GET /api/data/services/analytics
// @access  Private (Admin only)
const getServiceAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;

    // Calculate date range based on period
    let dateFrom = new Date();
    switch (period) {
      case '7d':
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      case '30d':
        dateFrom.setDate(dateFrom.getDate() - 30);
        break;
      case '90d':
        dateFrom.setDate(dateFrom.getDate() - 90);
        break;
      case '1y':
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);
        break;
      default:
        dateFrom.setDate(dateFrom.getDate() - 30);
    }

    // Services created in period
    const servicesCreated = await Service.countDocuments({
      createdAt: { $gte: dateFrom }
    });

    // Services by category in period
    const servicesByCategory = await Service.aggregate([
      {
        $match: {
          createdAt: { $gte: dateFrom }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Services created by day/week/month
    let groupFormat;
    switch (period) {
      case '7d':
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case '30d':
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case '90d':
        groupFormat = { $dateToString: { format: '%Y-%U', date: '$createdAt' } };
        break;
      case '1y':
        groupFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
        break;
      default:
        groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }

    const servicesOverTime = await Service.aggregate([
      {
        $match: {
          createdAt: { $gte: dateFrom }
        }
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Top performing categories
    const topCategories = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          totalServices: { $sum: 1 },
          activeServices: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { totalServices: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        period,
        dateFrom,
        servicesCreated,
        servicesByCategory,
        servicesOverTime,
        topCategories
      }
    });
  } catch (error) {
    console.error('Get service analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service analytics'
    });
  }
};

// @desc    Search services with advanced options
// @route   GET /api/data/services/search
// @access  Public
const searchServices = async (req, res) => {
  try {
    const {
      q,
      category,
      priceRange,
      features,
      sortBy = 'relevance',
      limit = 20
    } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    // Build search query
    let query = {
      $and: [
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { features: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
          ]
        },
        { status: 'active' }
      ]
    };

    // Add category filter
    if (category && category !== 'all') {
      query.$and.push({ category });
    }

    // Add price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        query.$and.push({
          $or: [
            { price: { $regex: `₹${min}`, $options: 'i' } },
            { price: { $regex: `₹${max}`, $options: 'i' } }
          ]
        });
      }
    }

    // Add features filter
    if (features) {
      const featureArray = features.split(',').map(f => f.trim());
      query.$and.push({
        features: { $in: featureArray.map(f => new RegExp(f, 'i')) }
      });
    }

    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort.name = 1;
        break;
      case 'price':
        sort.price = 1;
        break;
      case 'createdAt':
        sort.createdAt = -1;
        break;
      case 'relevance':
      default:
        // For relevance, we'll use text search score if available
        sort = { createdAt: -1 };
        break;
    }

    const services = await Service.find(query)
      .populate('createdBy', 'username')
      .sort(sort)
      .limit(parseInt(limit));

    // Get search suggestions
    const suggestions = await Service.distinct('name', {
      name: { $regex: q, $options: 'i' },
      status: 'active'
    }).limit(5);

    res.status(200).json({
      success: true,
      query: q,
      count: services.length,
      services,
      suggestions,
      filters: {
        category,
        priceRange,
        features,
        sortBy
      }
    });
  } catch (error) {
    console.error('Search services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching services'
    });
  }
};

// @desc    Get service categories with counts
// @route   GET /api/data/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

// @desc    Bulk operations on services
// @route   POST /api/data/services/bulk
// @access  Private (Admin only)
const bulkServiceOperations = async (req, res) => {
  try {
    const { operation, serviceIds, data } = req.body;

    if (!operation || !serviceIds || !Array.isArray(serviceIds)) {
      return res.status(400).json({
        success: false,
        message: 'Operation, serviceIds array, and data are required'
      });
    }

    let result;
    let message;

    switch (operation) {
      case 'activate':
        result = await Service.updateMany(
          { _id: { $in: serviceIds } },
          { status: 'active', updatedBy: req.admin.id }
        );
        message = `${result.modifiedCount} services activated`;
        break;

      case 'deactivate':
        result = await Service.updateMany(
          { _id: { $in: serviceIds } },
          { status: 'inactive', updatedBy: req.admin.id }
        );
        message = `${result.modifiedCount} services deactivated`;
        break;

      case 'delete':
        result = await Service.deleteMany({ _id: { $in: serviceIds } });
        message = `${result.deletedCount} services deleted`;
        break;

      case 'update':
        if (!data) {
          return res.status(400).json({
            success: false,
            message: 'Data is required for update operation'
          });
        }
        result = await Service.updateMany(
          { _id: { $in: serviceIds } },
          { ...data, updatedBy: req.admin.id }
        );
        message = `${result.modifiedCount} services updated`;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid operation. Supported operations: activate, deactivate, delete, update'
        });
    }

    res.status(200).json({
      success: true,
      message,
      result: {
        operation,
        affectedCount: result.modifiedCount || result.deletedCount,
        serviceIds
      }
    });
  } catch (error) {
    console.error('Bulk service operations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while performing bulk operations'
    });
  }
};

export {
	getDashboardStats,
	getAllServices,
	getServiceAnalytics,
	searchServices,
	getCategories,
	bulkServiceOperations
}

