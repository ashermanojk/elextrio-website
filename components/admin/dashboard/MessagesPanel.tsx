'use client';

import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getContactMessages, updateMessageStatus, ContactMessage } from '@/lib/supabase/client';

export default function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(message => {
    if (filterStatus === 'all') return true;
    return message.status === filterStatus;
  });

  const handleStatusChange = async (messageId: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      await updateMessageStatus(messageId, newStatus);
      setMessages(messages.map(message => 
        message.id === messageId ? { ...message, status: newStatus } : message
      ));

      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleSelectMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Automatically mark as read if it's new
    if (message.status === 'new') {
      handleStatusChange(message.id, 'read');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <select
              id="status"
              name="status"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-t-2 border-primary-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
            {filteredMessages.length === 0 ? (
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No messages found.
              </div>
            ) : (
              <div className="flex flex-col md:flex-row h-[calc(100vh-250px)]">
                {/* Message List */}
                <div className="w-full md:w-1/3 border-r overflow-auto">
                  <ul className="divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                      <li 
                        key={message.id}
                        className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                          selectedMessage?.id === message.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="truncate">
                            <div className="flex items-center">
                              {message.status === 'new' && (
                                <span className="flex-shrink-0 inline-block h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                              )}
                              <p className={`text-sm font-medium ${message.status === 'new' ? 'text-gray-900' : 'text-gray-600'}`}>
                                {message.name}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 truncate">
                              {message.email}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 text-xs text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 truncate">
                          {message.message.substring(0, 60)}...
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Message Details */}
                <div className="w-full md:w-2/3 p-4 overflow-auto">
                  {selectedMessage ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Message Details</h2>
                        <div className="flex space-x-2">
                          <select
                            value={selectedMessage.status}
                            onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as any)}
                            className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="border-t border-b border-gray-200 py-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-md font-medium text-gray-900">{selectedMessage.name}</h3>
                          <span className="text-sm text-gray-500">{formatDate(selectedMessage.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">Email:</span> {selectedMessage.email}
                        </p>
                        {selectedMessage.phone && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Phone:</span> {selectedMessage.phone}
                          </p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Message:</h4>
                        <div className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap">
                          {selectedMessage.message}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          onClick={() => {
                            window.location.href = `mailto:${selectedMessage.email}`;
                            handleStatusChange(selectedMessage.id, 'replied');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select a message to view details
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
