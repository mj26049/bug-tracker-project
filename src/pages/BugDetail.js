import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '../components/UIComponents';
import { FormSelect } from '../components/FormElements';
import { useBugs } from '../hooks/useBugs';
import { useAuth } from '../contexts/AuthContext';
import { bugStatuses } from '../data/sampleData';

export const BugDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBug, updateBug, deleteBug } = useBugs();
  const { user } = useAuth();
  const [bug, setBug] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBug, setEditedBug] = useState(null);

  useEffect(() => {
    const bugData = getBug(id);
    if (!bugData) {
      navigate('/bugs');
      return;
    }
    setBug(bugData);
    setEditedBug(bugData);
  }, [id, getBug, navigate]);

  if (!bug) return null;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateBug(bug.id, { status: newStatus });
    setBug(prev => ({ ...prev, status: newStatus }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      deleteBug(bug.id);
      navigate('/bugs');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateBug(bug.id, editedBug);
    setBug(editedBug);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBug(bug);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBug(prev => ({ ...prev, [name]: value }));
  };

  const openGithubIssue = () => {
    const title = encodeURIComponent(bug.title);
    const body = encodeURIComponent(bug.description);
    const url = `https://github.com/your-repo/issues/new?title=${title}&body=${body}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={editedBug.title}
                  onChange={handleInputChange}
                  className="text-2xl font-bold mb-2 input"
                />
              ) : (
                <h1 className="text-2xl font-bold mb-2">{bug.title}</h1>
              )}
              <div className="flex space-x-3">
                <Badge type="status" value={bug.status} />
                <Badge type="priority" value={bug.priority} />
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing && (
                <>
                  <button onClick={handleEdit} className="btn btn-secondary">
                    Edit
                  </button>
                  <button onClick={handleDelete} className="btn btn-secondary text-red-600">
                    Delete
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button onClick={handleSave} className="btn btn-primary">
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedBug.description}
                  onChange={handleInputChange}
                  className="input min-h-[100px]"
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-wrap">{bug.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <FormSelect
                      value={bug.status}
                      onChange={handleStatusChange}
                      options={bugStatuses}
                    />
                  </div>
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="ml-2">{new Date(bug.createdAt).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Updated:</span>
                    <span className="ml-2">{new Date(bug.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Assignment</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Assigned To:</span>
                    <span className="ml-2">{bug.assignedTo}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Created by:</span>
                    <span className="ml-2">{bug.createdBy === user.id ? 'You' : bug.createdBy}</span>
                  </div>
                </div>
              </div>
            </div>

            {bug.attachment && (
              <div>
                <h3 className="text-lg font-medium mb-2">Attachment</h3>
                {bug.attachment.type.startsWith('image/') ? (
                  <img
                    src={bug.attachment.data}
                    alt="Bug attachment"
                    className="max-w-md rounded-lg shadow-md"
                  />
                ) : (
                  <a
                    href={bug.attachment.data}
                    download={bug.attachment.name}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Download {bug.attachment.name}
                  </a>
                )}
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={openGithubIssue}
                className="btn btn-secondary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Create GitHub Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};