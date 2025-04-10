'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import RichTextEditor from '@/components/admin/common/RichTextEditor';
import { 
  getWebContent, 
  updateWebContent, 
  createWebContent,
  deleteWebContent,
  WebContent 
} from '@/lib/supabase/client';

export default function ContentPanel() {
  const [content, setContent] = useState<WebContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Partial<WebContent> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const sections = [
    { id: 'all', name: 'All Sections' },
    { id: 'home', name: 'Home Page' },
    { id: 'about', name: 'About Us' },
    { id: 'services', name: 'Services' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
    { id: 'careers', name: 'Careers' },
    { id: 'footer', name: 'Footer' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      setLoading(true);
      const data = await getWebContent();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredContent = content.filter(item => {
    if (selectedSection === 'all') return true;
    return item.section === selectedSection;
  });

  const handleCreateNew = () => {
    setCurrentContent({
      key: '',
      value: '',
      section: selectedSection !== 'all' ? selectedSection : 'home',
      type: 'text'
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (content: WebContent) => {
    setCurrentContent(content);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteWebContent(id);
        setContent(content.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentContent) return;

    try {
      if (isEditing && currentContent.id) {
        await updateWebContent(currentContent.id, currentContent);
        setContent(content.map(c => 
          c.id === currentContent.id ? { ...c, ...currentContent } as WebContent : c
        ));
      } else {
        const contentData = currentContent as Omit<WebContent, 'id' | 'created_at'>;
        await createWebContent(contentData);
        await fetchContent(); // Refetch to get the new ID and created_at
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentContent(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleEditorChange = (content: string) => {
    setCurrentContent(prev => prev ? { ...prev, value: content } : null);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Website Content</h1>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <select
              id="section-filter"
              name="section-filter"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>
            
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
              Add Content
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
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Section
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Key
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Value
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredContent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No content found. {selectedSection === 'all' ? 'Add your first content to get started.' : `Add content to the ${sections.find(s => s.id === selectedSection)?.name} section.`}
                    </td>
                  </tr>
                ) : (
                  filteredContent.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {sections.find(s => s.id === item.section)?.name || item.section}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.key}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-md truncate">
                        {item.type === 'image' ? (
                          <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-900">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
      {isModalOpen && currentContent && (
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
                        {isEditing ? 'Edit Content' : 'Add New Content'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="key" className="block text-sm font-medium text-gray-700">
                            Content Key*
                          </label>
                          <input
                            type="text"
                            name="key"
                            id="key"
                            value={currentContent.key || ''}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            A unique identifier for this content (e.g., "hero_title", "about_description")
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                            Section*
                          </label>
                          <select
                            id="section"
                            name="section"
                            value={currentContent.section || 'home'}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          >
                            {sections.filter(s => s.id !== 'all').map((section) => (
                              <option key={section.id} value={section.id}>{section.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Content Type*
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={currentContent.type || 'text'}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          >
                            <option value="text">Text</option>
                            <option value="html">HTML</option>
                            <option value="image">Image URL</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                            Content*
                          </label>
                          {currentContent.type === 'html' ? (
                            <div className="mt-1 border border-gray-300 rounded-md overflow-hidden">
                              <RichTextEditor 
                                value={currentContent.value || ''}
                                onChange={handleEditorChange}
                                height={300}
                                placeholder="Enter your content here..."
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              name="value"
                              id="value"
                              value={currentContent.value || ''}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                          )}
                          {currentContent.type === 'image' && (
                            <p className="mt-1 text-xs text-gray-500">
                              Enter the full URL of the image.
                            </p>
                          )}
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
                    {isEditing ? 'Save Changes' : 'Create Content'}
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
