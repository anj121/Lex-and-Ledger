import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import ServiceManagement from '../components/ServiceManagement.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faGavel, 
  faBoxes, 
  faBookOpen, 
  faEnvelope,
  faBars,
  faDashboard,
  faUsers,
  faFileAlt,
  faShieldAlt,
  faCreditCard,
  faUserCheck,
  faUpload,
  faSearch,
  faFilter,
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faEye,
  faDownload,
  faSync,
  faCog,
  faSignOutAlt,
  faBell,
  faArrowLeft,
  faPlus,
  faEdit,
  faTrash,
  faCalendar,
  faChartLine,
  faExclamationTriangle,
  faCheckSquare,
  faTimes
} from "@fortawesome/free-solid-svg-icons"
import BundleManagement from '@/components/BundleManagement.jsx'

const AdminPanel = () => {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState(null)
  const [users, setUsers] = useState([])
  const [documents, setDocuments] = useState([])
  const [caVerifications, setCaVerifications] = useState([])
  const [idProofs, setIdProofs] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [formData, setFormData] = useState({})

  // API base URL
  const API_BASE = 'https://19hninc1jpkm.manus.space/api/admin'

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/dashboard`)
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/users`)
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/documents`)
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch CA verifications
  const fetchCAVerifications = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/ca-verifications`)
      const data = await response.json()
      setCaVerifications(data.verifications || [])
    } catch (error) {
      console.error('Error fetching CA verifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch ID proofs
  const fetchIDProofs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/id-proofs`)
      const data = await response.json()
      setIdProofs(data.id_proofs || [])
    } catch (error) {
      console.error('Error fetching ID proofs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/subscriptions`)
      const data = await response.json()
      setSubscriptions(data.subscriptions || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch activities
  const fetchActivities = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/activities`)
      const data = await response.json()
      setActivities(data.activities || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle section change
  const handleSectionChange = (section) => {
    try {
      setCurrentSection(section)
      setLoading(true)
      
      switch (section) {
        case 'dashboard':
          fetchDashboard()
          break
        case 'services':
          // Services are handled by ServiceManagement component
          setLoading(false)
          break
        case 'users':
          fetchUsers()
          break
        case 'documents':
          fetchDocuments()
          break
        case 'ca-verification':
          fetchCAVerifications()
          break
        case 'id-verification':
          fetchIDProofs()
          break
        case 'subscriptions':
          fetchSubscriptions()
          break
        case 'activities':
          fetchActivities()
          break
        default:
          console.warn('Unknown section:', section)
          setLoading(false)
      }
    } catch (error) {
      console.error('Error changing section:', error)
      setLoading(false)
    }
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let endpoint = ''
      let method = 'POST'
      let body = formData

      switch (modalType) {
        case 'verify-ca':
          endpoint = `${API_BASE}/verify/ca`
          break
        case 'verify-account':
          endpoint = `${API_BASE}/verify/account`
          break
        case 'verify-aadhar':
          endpoint = `${API_BASE}/verify/aadhar`
          break
        case 'verify-pan':
          endpoint = `${API_BASE}/verify/pan`
          break
        case 'verify-document':
          endpoint = `${API_BASE}/documents/${formData.id}/verify`
          method = 'PUT'
          break
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setShowModal(false)
        setFormData({})
        // Refresh current section data
        handleSectionChange(currentSection)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initialize dashboard
  useEffect(() => {
    fetchDashboard()
  }, [])

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'verified':
        case 'approved':
        case 'active':
        case 'paid':
          return 'bg-green-100 text-green-700'
        case 'pending':
          return 'bg-yellow-100 text-yellow-700'
        case 'rejected':
        case 'invalid':
        case 'expired':
        case 'suspended':
        case 'failed':
          return 'bg-red-100 text-red-700'
        default:
          return 'bg-gray-100 text-gray-700'
      }
    }

    return (
      <Badge className={`${getStatusColor(status)} border-0`}>
        {status}
      </Badge>
    )
  }

  // Sidebar navigation
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: faDashboard },
    { id: 'services', label: 'Services', icon: faGavel },
    { id: 'bundles', label: 'Bundles', icon: faGavel },

    { id: 'users', label: 'Users', icon: faUsers },
    { id: 'documents', label: 'Documents', icon: faFileAlt },
    { id: 'ca-verification', label: 'CA Verification', icon: faShieldAlt },
    { id: 'id-verification', label: 'ID Verification', icon: faUserCheck },
    { id: 'subscriptions', label: 'Subscriptions', icon: faCreditCard },
    { id: 'activities', label: 'Activity Logs', icon: faClock }
  ]

  // Dashboard section
  const renderDashboard = () => (
    <div className="space-y-6 my-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button onClick={() => fetchDashboard()} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-blue-900">
                  {dashboardData?.metrics?.total_users || 0}
                </p>
              </div>
              <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Pending Verifications</p>
                <p className="text-3xl font-bold text-yellow-900">
                  {dashboardData?.metrics?.pending_verifications || 0}
                </p>
              </div>
              <FontAwesomeIcon icon={faClock} className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Active Subscriptions</p>
                <p className="text-3xl font-bold text-green-900">
                  {dashboardData?.metrics?.active_subscriptions || 0}
                </p>
              </div>
              <FontAwesomeIcon icon={faChartLine} className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Documents</p>
                <p className="text-3xl font-bold text-purple-900">
                  {dashboardData?.metrics?.total_documents || 0}
                </p>
              </div>
              <FontAwesomeIcon icon={faFileAlt} className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.recent_activities?.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.description}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Users section
  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => fetchUsers()} className="bg-blue-600 hover:bg-blue-700">
            <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.company}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.role} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.registration_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setModalType('user-details')
                          setShowModal(true)
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Documents section
  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <div className="flex gap-2">
                      <Button 
              onClick={() => {
                setModalType('upload-document')
                setShowModal(true)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" />
              Upload
            </Button>
                      <Button onClick={() => fetchDocuments()} className="bg-blue-600 hover:bg-blue-700">
              <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
              Refresh
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{doc.file_name}</p>
                        <p className="text-sm text-gray-500">{doc.file_type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={doc.category} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {(doc.file_size / 1024).toFixed(1)} KB
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(doc.upload_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setFormData({ id: doc.id, status: 'approved' })
                            setModalType('verify-document')
                            setShowModal(true)
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setFormData({ id: doc.id, status: 'rejected' })
                            setModalType('verify-document')
                            setShowModal(true)
                          }}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // CA Verification section
  const renderCAVerification = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">CA Number Verification</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setModalType('verify-ca')
              setShowModal(true)
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
            Verify CA
          </Button>
          <Button onClick={() => fetchCAVerifications()} className="bg-blue-600 hover:bg-blue-700">
            <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CA Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CA Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {caVerifications.map((ca) => (
                  <tr key={ca.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{ca.ca_number}</td>
                    <td className="px-6 py-4 text-gray-900">{ca.ca_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {ca.valid_until ? new Date(ca.valid_until).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ca.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {ca.verification_date ? new Date(ca.verification_date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // ID Verification section
  const renderIDVerification = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">ID Proof Verification</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setModalType('verify-aadhar')
              setShowModal(true)
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
            Verify Aadhar
          </Button>
          <Button 
            onClick={() => {
              setModalType('verify-pan')
              setShowModal(true)
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
            Verify PAN
          </Button>
          <Button onClick={() => fetchIDProofs()} className="bg-blue-600 hover:bg-blue-700">
            <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holder Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {idProofs.map((proof) => (
                  <tr key={proof.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <StatusBadge status={proof.proof_type} />
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">{proof.proof_number}</td>
                    <td className="px-6 py-4 text-gray-900">{proof.holder_name}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={proof.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {proof.verification_date ? new Date(proof.verification_date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Subscriptions section
  const renderSubscriptions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <Button onClick={() => fetchSubscriptions()} className="bg-blue-600 hover:bg-blue-700">
          <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">#{sub.user_id}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={sub.plan_type} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">₹{sub.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(sub.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={sub.payment_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Activities section
  const renderActivities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <Button onClick={() => fetchActivities()} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <FontAwesomeIcon icon={faSync} className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.slice(0, 10).map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action || 'System Activity'}</p>
                  <p className="text-xs text-gray-500">{activity.description || 'No description available'}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Modal component
  const renderModal = () => {
    if (!showModal) return null

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {modalType === 'verify-ca' && 'Verify CA Number'}
              {modalType === 'verify-aadhar' && 'Verify Aadhar'}
              {modalType === 'verify-pan' && 'Verify PAN'}
              {modalType === 'verify-document' && 'Verify Document'}
              {modalType === 'user-details' && 'User Details'}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </Button>
          </div>

          {modalType === 'user-details' && selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{selectedUser.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Company</label>
                <p className="text-gray-900">{selectedUser.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Role</label>
                <StatusBadge status={selectedUser.role} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <StatusBadge status={selectedUser.status} />
              </div>
            </div>
          )}

          {(modalType === 'verify-ca' || modalType === 'verify-aadhar' || modalType === 'verify-pan' || modalType === 'verify-document') && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {modalType === 'verify-ca' && (
                <>
                  <Input
                    name="user_id"
                    placeholder="User ID"
                    value={formData.user_id || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="ca_number"
                    placeholder="CA Number (6 digits)"
                    value={formData.ca_number || ''}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              {modalType === 'verify-aadhar' && (
                <>
                  <Input
                    name="user_id"
                    placeholder="User ID"
                    value={formData.user_id || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="aadhar_number"
                    placeholder="Aadhar Number (12 digits)"
                    value={formData.aadhar_number || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="holder_name"
                    placeholder="Holder Name"
                    value={formData.holder_name || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                  />
                </>
              )}

              {modalType === 'verify-pan' && (
                <>
                  <Input
                    name="user_id"
                    placeholder="User ID"
                    value={formData.user_id || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="pan_number"
                    placeholder="PAN Number (AAAAA9999A)"
                    value={formData.pan_number || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="holder_name"
                    placeholder="Holder Name"
                    value={formData.holder_name || ''}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              {modalType === 'verify-document' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status || ''}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <Textarea
                    name="notes"
                    placeholder="Verification notes"
                    value={formData.notes || ''}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="verified_by"
                    placeholder="Verified by"
                    value={formData.verified_by || 'Admin'}
                    onChange={handleInputChange}
                  />
                </>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? 'Processing...' : 'Submit'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Professional Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl flex flex-col h-screen">
          {/* Sidebar Header - Aligned with Navbar Logo */}
          <div className="pt-4 pb-6 px-6 border-b border-gray-200/50">
            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faDashboard} className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Lex&Ledger</p>
              </div>
            </div> */}
          </div>

          {/* Navigation - Full Height */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={`w-5 h-5 transition-all duration-300 ${
                      currentSection === item.id ? 'text-white' : 'text-gray-500'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content - Full Height */}
        <div className="flex-1 pt-4 px-10 pb-10 flex flex-col h-screen">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl mb-6">
                  <FontAwesomeIcon icon={faSync} className="w-8 h-8 animate-spin text-white" />
                </div>
                <p className="text-gray-700 text-xl font-medium">Loading admin data...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
              </div>
            </div>
          )}

          {!loading && currentSection === 'dashboard' && renderDashboard()}
          {!loading && currentSection === 'services' && <ServiceManagement />}
          {!loading && currentSection === 'bundles' && <BundleManagement />}

          {!loading && currentSection === 'users' && renderUsers()}
          {!loading && currentSection === 'documents' && renderDocuments()}
          {!loading && currentSection === 'ca-verification' && renderCAVerification()}
          {!loading && currentSection === 'id-verification' && renderIDVerification()}
          {!loading && currentSection === 'subscriptions' && renderSubscriptions()}
          {!loading && currentSection === 'activities' && renderActivities()}

          {/* Footer Area - Clean and Simple */}
          <div className="mt-auto p-6 border-t border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faDashboard} className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-600">Admin Portal v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}

export default AdminPanel

