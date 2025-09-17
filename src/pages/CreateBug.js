import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput, FormSelect, FormTextarea } from '../components/FormElements';
import { useBugs } from '../hooks/useBugs';
import { useAuth } from '../contexts/AuthContext';
import { bugPriorities, bugTypes } from '../data/sampleData';

export const CreateBug = () => {
  const navigate = useNavigate();
  const { addBug } = useBugs();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    type: 'bug',
    assignedTo: '',
    assignedEmail: '',
    attachment: null,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFormData(prev => ({
          ...prev,
          attachment: {
            name: file.name,
            type: file.type,
            data: base64
          }
        }));
      } catch (err) {
        setError('Failed to process file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      const newBug = await addBug({
        ...formData,
        status: 'open',
        createdBy: user.id,
      });
      navigate(`/bugs/${newBug.id}`);
    } catch (err) {
      setError('Failed to create bug');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Bug</h1>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter bug title"
              required
            />

            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the bug in detail"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                options={bugPriorities}
              />

              <FormSelect
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                options={bugTypes}
              />
            </div>

            <FormInput
              label="Assign To"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              placeholder="Enter assignee name"
            />

            <FormInput
              label="Assignee Email"
              name="assignedEmail"
              type="email"
              value={formData.assignedEmail}
              onChange={handleInputChange}
              placeholder="Enter assignee email"
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Attachment
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate('/bugs')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Create Bug
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};