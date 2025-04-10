'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  getIndustries, 
  updateIndustry, 
  createIndustry,
  deleteIndustry,
  Industry 
} from '@/lib/supabase/client';

export default function IndustriesPanel() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState<Partial<Industry> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchIndustries();
  }, []);

  async function fetchIndustries() {
    try {
      setLoading(true);
      const data = await getIndustries();
      setIndustries(data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNew = () => {
    setCurrentIndustry({
      name: '',
      description: '',
      icon: '',
      applications: [],
      image_url: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (industry: Industry) => {
    // Convert applications back to string for editing if it's an array
    const editIndustry = {
      ...industry,
      applications: Array.isArray(industry.applications) 
        ? industry.applications.join(', ') 
        : industry.applications,
    };
    setCurrentIndustry(editIndustry);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this industry?')) {
      try {
        await deleteIndustry(id);
        setIndustries(industries.filter(industry => industry.id !== id));
      } catch (error) {
        console.error('Error deleting industry:', error);
      }
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentIndustry) return;

    try {
      // Process applications to ensure it's an array
      const processedIndustry = {
        ...currentIndustry,
        applications: typeof currentIndustry.applications === 'string'
          ? currentIndustry.applications.split(',').map(app => app.trim())
          : currentIndustry.applications,
      };

      if (isEditing && processedIndustry.id) {
        await updateIndustry(processedIndustry.id, processedIndustry);
        setIndustries(industries.map(i => 
          i.id === processedIndustry.id ? { ...i, ...processedIndustry } as Industry : i
        ));
      } else {
        const industryData = processedIndustry as Omit<Industry, 'id' | 'created_at'>;
        await createIndustry(industryData);
        await fetchIndustries(); // Refetch to get the new ID and created_at
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving industry:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentIndustry(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Industries</h1>
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
                  d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              Add Industry
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-t-2 border-primary-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th 
                    scope="col" 
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
                  >
                    Description
                  </th>
                  <th 
                    scope="col" 
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
                  >
                    Icon
                  </th>
                  <th 
                    scope="col" 
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Applications
                  </th>
                  <th 
                    scope="col" 
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {industries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No industries found. Add your first industry to get started.
                    </td>
                  </tr>
                ) : (
                  industries.map((industry) => (
                    <tr key={industry.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {industry.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 hidden lg:table-cell max-w-xs truncate">
                        {industry.description}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                        {industry.icon}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {Array.isArray(industry.applications) 
                          ? industry.applications.join(', ') 
                          : industry.applications}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(industry)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(industry.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && currentIndustry && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSave}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {isEditing ? 'Edit Industry' : 'Add New Industry'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name*
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={currentIndustry.name || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description*
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={currentIndustry.description || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                            Icon (emoji or icon code)
                          </label>
                          <input
                            type="text"
                            name="icon"
                            id="icon"
                            value={currentIndustry.icon || ''}
                            onChange={handleInputChange}
                            placeholder="📊 or 🏭 or another emoji"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="applications" className="block text-sm font-medium text-gray-700">
                            Applications (comma separated)*
                          </label>
                          <input
                            type="text"
                            name="applications"
                            id="applications"
                            value={currentIndustry.applications || ''}
                            onChange={handleInputChange}
                            required
                            placeholder="Process Control, Monitoring, Quality Control"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Enter applications separated by commas
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                            Image URL
                          </label>
                          <input
                            type="text"
                            name="image_url"
                            id="image_url"
                            value={currentIndustry.image_url || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
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
                    {isEditing ? 'Save Changes' : 'Create Industry'}
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
