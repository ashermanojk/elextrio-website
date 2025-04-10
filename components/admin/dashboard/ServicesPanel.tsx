'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  getServices, 
  updateService, 
  createService,
  deleteService,
  Service 
} from '@/lib/supabase/client';

export default function ServicesPanel() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNew = () => {
    setCurrentService({
      title: '',
      description: '',
      icon: '',
      featured: false,
      short_description: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        setServices(services.filter(service => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentService) return;

    try {
      if (isEditing && currentService.id) {
        await updateService(currentService.id, currentService);
        setServices(services.map(s => 
          s.id === currentService.id ? { ...s, ...currentService } as Service : s
        ));
      } else {
        await createService(currentService as Omit<Service, 'id' | 'created_at'>);
        await fetchServices(); // Refetch to get the new ID and created_at
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentService(prev => prev ? { ...prev, [name]: checked } : null);
    } else {
      setCurrentService(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg 
                className="-ml-1 mr-2 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              Add New Service
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-t-2 border-primary-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {services.length === 0 ? (
              <div className="px-4 py-5 bg-white sm:p-6 text-center text-gray-500">
                No services found. Click "Add New Service" to create one.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Added
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                            {service.icon ? (
                              <span className="text-xl" aria-hidden="true">
                                {service.icon}
                              </span>
                            ) : (
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {service.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {service.short_description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.featured 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.featured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(service.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Service Edit/Create Modal */}
      {isModalOpen && currentService && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSave}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditing ? 'Edit Service' : 'Add New Service'}
                      </h3>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Service Title*
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={currentService.title || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">
                            Short Description*
                          </label>
                          <input
                            type="text"
                            name="short_description"
                            id="short_description"
                            value={currentService.short_description || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Full Description*
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={4}
                            value={currentService.description || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                            Icon (emoji or icon code)*
                          </label>
                          <input
                            type="text"
                            name="icon"
                            id="icon"
                            value={currentService.icon || ''}
                            onChange={handleInputChange}
                            required
                            placeholder="📱 or ⚙️ or another emoji"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="featured"
                            id="featured"
                            checked={currentService.featured || false}
                            onChange={(e) => setCurrentService({
                              ...currentService,
                              featured: e.target.checked
                            })}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                            Featured Service
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isEditing ? 'Save Changes' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
