import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search, 
  Filter,
  DollarSign,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import API_CONFIG from '../config/api.js';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    features: '',
    requirements: '',
    faq: '',
    status: 'active'
  });

  // Service categories
  const categories = [
    'Company Formation',
    'Tax Services',
    'Legal Services',
    'Compliance',
    'Financial Planning',
    'Documentation',
    'Consultation',
    'Other'
  ];

  // API base URL from configuration
  const API_BASE = API_CONFIG.BASE_URL;
  // Get authentication token
  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/services`, {
        headers
      });
      
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      } else {
        // Fallback to mock data if API is not available
        setServices(mockServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      // Use mock data as fallback
      setServices(mockServices);
      toast.error('Using offline data. Backend not connected.');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development
  const mockServices = [
    {
      _id: '1',
      name: 'Company Registration',
      description: 'Complete company registration service including all legal formalities',
      category: 'Company Formation',
      price: '₹15,000',
      duration: '7-10 days',
      features: 'GST Registration, PAN, Bank Account, Digital Signature',
      requirements: 'Aadhar, PAN, Address Proof, Business Plan',
      faq: 'Q: How long does company registration take? A: Typically 7-10 business days. Q: What documents are required? A: Aadhar, PAN, address proof, and business plan.',
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Income Tax Filing',
      description: 'Professional income tax return filing service',
      category: 'Tax Services',
      price: '₹2,500',
      duration: '2-3 days',
      features: 'ITR Preparation, E-filing, Acknowledgment, Support',
      requirements: 'Form 16, Bank Statements, Investment Proofs',
      faq: 'Q: What is the deadline for ITR filing? A: July 31st for individuals. Q: Can I file ITR without Form 16? A: Yes, but you need salary details and TDS certificates.',
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
// Convert comma separated string to array
const parseCommaSeparated = (value) => {
  console.log({value})
  return value
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');
};

// Convert FAQ text format to array of objects
const parseFAQ = (faqText) => {
  if (!faqText) return [];

  const faqArray = [];
  const blocks = faqText.split('\n').filter(line => line.trim() !== '');

  let currentQuestion = '';
  let currentAnswer = '';

  blocks.forEach(line => {
    if (line.startsWith('Q:')) {
      currentQuestion = line.replace('Q:', '').trim();
    }
    if (line.startsWith('A:')) {
      currentAnswer = line.replace('A:', '').trim();
      if (currentQuestion && currentAnswer) {
        faqArray.push({
          question: currentQuestion,
          answer: currentAnswer
        });
        currentQuestion = '';
        currentAnswer = '';
      }
    }
  });

  return faqArray;
};
const convertFaqArrayToString = (faqArray) => {
  if (!faqArray || faqArray.length === 0) return "";

  return faqArray
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService 
        ? `${API_BASE}/services/${editingService._id}`
        : `${API_BASE}/services`;

      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
const payload = {
  ...formData,
  features: parseCommaSeparated(formData.features),
  requirements: parseCommaSeparated(formData.requirements),
  faq: parseFAQ(formData.faq)
};

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingService ? 'Service updated successfully!' : 'Service added successfully!');
        setShowForm(false);
        setEditingService(null);
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          duration: '',
          features: '',
          requirements: '',
          faq: '',
          status: 'active'
        });
        fetchServices();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(error.message || 'Failed to save service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit service
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      features: service.features.toString(),
      requirements: service.requirements.toString(),
      faq: convertFaqArrayToString(service.faq) || '',
      status: service.status
    });
    setShowForm(true);
  };

  // Handle delete service
  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        toast.success('Service deleted successfully!');
        fetchServices();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(error.message || 'Failed to delete service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Initialize services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="space-y-6 overflow-y-auto scrollbar-hide">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingService(null);
            setFormData({
              name: '',
              description: '',
              category: '',
              price: '',
              duration: '',
              features: '',
              requirements: '',
              faq: '',
              status: 'active'
            });
          }}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600">Loading services...</p>
            </div>
          </div>
        ) : filteredServices.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== 'all' 
                  ? 'No services match your search criteria.' 
                  : 'Get started by adding your first service.'}
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredServices.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <Badge className={service.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Price: {service.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Duration: {service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Category: {service.category}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Features:</h4>
                        <p className="text-sm text-gray-600">{service.features?.toString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                        <p className="text-sm text-gray-600">{service.requirements?.toString()}</p>
                      </div>
                    </div>

                    {service.faq && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">FAQ:</h4>
                        {/* <p className="text-sm text-gray-600 whitespace-pre-line">{service.faq}</p> */}
                      </div>
                    )}
                    {service.faq.map((item, i) => (
  <div key={i}>
    <h4 className="text-sm font-medium text-gray-700 mb-1">{item.question}</h4>
    <p className="text-sm text-gray-600 whitespace-pre-line">{item.answer}</p>
  </div>
))}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Service Form Modal */}
      {showForm && (
<div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter service name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Enter service description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <Input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ₹15,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <Input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 7-10 days"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features *
                  </label>
                  <Textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    placeholder="List key features separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements *
                  </label>
                  <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    placeholder="List required documents/information"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FAQ (Optional)
                  </label>
                  <Textarea
                    name="faq"
                    value={formData.faq}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Add frequently asked questions and answers for this service. Format: Q: Question? A: Answer. Q: Another question? A: Another answer."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: Q: Question? A: Answer. Separate multiple Q&A pairs with line breaks.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingService ? 'Update Service' : 'Add Service'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
