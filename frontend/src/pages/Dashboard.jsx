import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Users, User, Calendar, FileText, DollarSign, Plus } from 'lucide-react';
import { patientsAPI, doctorsAPI, appointmentsAPI, medicalRecordsAPI, billingAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('patients');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const tabs = [
    { id: 'patients', label: 'Patients', icon: Users, api: patientsAPI },
    { id: 'doctors', label: 'Doctors', icon: User, api: doctorsAPI },
    { id: 'appointments', label: 'Appointments', icon: Calendar, api: appointmentsAPI },
    { id: 'medicalRecords', label: 'Medical Records', icon: FileText, api: medicalRecordsAPI },
    { id: 'billing', label: 'Billing', icon: DollarSign, api: billingAPI },
  ];

  const loadData = async (tabId, api) => {
    setLoading(true);
    try {
      const res = await api.getAll();
      setData(res.data.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error loading data');
    }
    setLoading(false);
  };

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab);
    if (tab) loadData(activeTab, tab.api);
  }, [activeTab]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tab = tabs.find(t => t.id === activeTab);
    try {
      await tab.api.create(formData);
      loadData(activeTab, tab.api);
      setShowForm(false);
      setFormData({});
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating item');
    }
  };

  const fields = {
    patients: ['name', 'dob', 'phone', 'email'],
    doctors: ['name', 'specialty', 'phone'],
    appointments: ['patient_id', 'doctor_id', 'date_time', 'status'],
    medicalRecords: ['patient_id', 'doctor_id', 'diagnosis', 'prescription'],
    billing: ['patient_id', 'appointment_id', 'amount', 'status'],
  };

  const getFormFields = (tabId) => fields[tabId] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Hospital SaaS Dashboard</h1>
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {user.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm border-b-2 flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">{error}</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </button>
              </div>

              {/* Table */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      {data.length > 0 && Object.keys(data[0] || {}).filter(key => !['created_at', 'updated_at']).map(key => (
                        <th key={key} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                        {Object.keys(item).filter(key => !['created_at', 'updated_at']).map(key => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Add New {activeTab.replace(/([A-Z])/g, ' $1')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {getFormFields(activeTab).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
                    <input
                      name={field}
                      type={field.includes('date') || field.includes('dob') ? 'date' : field.includes('amount') ? 'number' : 'text'}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

