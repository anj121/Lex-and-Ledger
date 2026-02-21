import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  DollarSign,
  Clock,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import API_CONFIG from '../config/api.js';

const BundleManagement = () => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBundle, setEditingBundle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    price: '',
    originalPrice: '',
    duration: '',
    features: '',
    includes: '',
    process: '',
    benefits: '',
    popular: false,
    status: 'active'
  });

  const API_BASE = API_CONFIG.BASE_URL;

  const getAuthToken = () => localStorage.getItem('adminToken');

  const fetchBundles = async () => {
    try {
      setLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      const token = getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/bundles`, { headers });
      if (res.ok) {
        const data = await res.json();
        setBundles(data.bundles || []);
      } else {
        setBundles(mockBundles);
      }
    } catch (e) {
      console.error(e);
      setBundles(mockBundles);
      toast.error('Using offline bundle data');
    } finally {
      setLoading(false);
    }
  };

  const mockBundles = [
    {
      _id: '1',
      name: 'Startup Essentials Bundle',
      description: 'Everything you need to start your business legally',
      longDescription: 'Complete startup compliance and registration bundle',
      price: '₹35,000',
      originalPrice: '₹45,000',
      duration: '15-20 days',
      features: 'Company Registration, GST, PAN, DSC',
      includes: 'Incorporation, Registrations, 3 months support',
      process: 'Consultation, Documentation, Filing, Delivery',
      benefits: 'Compliance, Time saving, Cost effective',
      popular: true,
      status: 'active'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingBundle ? 'PUT' : 'POST';
      const url = editingBundle
        ? `${API_BASE}/bundles/${editingBundle._id}`
        : `${API_BASE}/bundles`;

      const headers = { 'Content-Type': 'application/json' };
      const token = getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save bundle');

      toast.success(editingBundle ? 'Bundle updated' : 'Bundle created');
      setShowForm(false);
      setEditingBundle(null);
      resetForm();
      fetchBundles();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      price: '',
      originalPrice: '',
      duration: '',
      features: '',
      includes: '',
      process: '',
      benefits: '',
      popular: false,
      status: 'active'
    });
  };

  const handleEdit = (bundle) => {
    setEditingBundle(bundle);
    setFormData({ ...bundle });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bundle?')) return;

    try {
      const headers = { 'Content-Type': 'application/json' };
      const token = getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/bundles/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) throw new Error('Delete failed');
      toast.success('Bundle deleted');
      fetchBundles();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const filteredBundles = bundles.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bundle Management</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Bundle
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search bundles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredBundles.map((bundle) => (
          <Card key={bundle._id} className="hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{bundle.name}</h3>
                    {bundle.popular && <Badge>Popular</Badge>}
                  </div>
                  <p className="text-gray-600">{bundle.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{bundle.price}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{bundle.duration}</span>
                    <span className="flex items-center gap-1"><Layers className="w-4 h-4" />Bundle</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(bundle)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(bundle._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">{editingBundle ? 'Edit Bundle' : 'Add Bundle'}</h2>
              <button onClick={() => setShowForm(false)}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Bundle name" value={formData.name} onChange={handleInputChange} required />
              <Textarea name="description" placeholder="Short description" value={formData.description} onChange={handleInputChange} required />
              <Textarea name="longDescription" placeholder="Long description" value={formData.longDescription} onChange={handleInputChange} />

              <div className="grid grid-cols-2 gap-4">
                <Input name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <Input name="originalPrice" placeholder="Original Price" value={formData.originalPrice} onChange={handleInputChange} />
                <Input name="duration" placeholder="Duration" value={formData.duration} onChange={handleInputChange} />
              </div>

              <Textarea name="features" placeholder="Features (comma separated)" value={formData.features} onChange={handleInputChange} />
              <Textarea name="includes" placeholder="Includes" value={formData.includes} onChange={handleInputChange} />
              <Textarea name="process" placeholder="Process" value={formData.process} onChange={handleInputChange} />
              <Textarea name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleInputChange} />

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="popular" checked={formData.popular} onChange={handleInputChange} />
                Mark as popular
              </label>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" /> Save Bundle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleManagement;