import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/UIComponents';
import { useBugs } from '../hooks/useBugs';
import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { bugs } = useBugs();
  const { user } = useAuth();

  const userBugs = useMemo(() => {
    const assignedBugs = bugs.filter(bug => bug.assignedEmail === user.email);
    const createdBugs = bugs.filter(bug => bug.createdBy === user.id);
    const resolvedBugs = bugs.filter(
      bug => bug.status === 'resolved' && bug.assignedEmail === user.email
    );

    return {
      assigned: assignedBugs,
      created: createdBugs,
      resolved: resolvedBugs,
    };
  }, [bugs, user]);

  const BugsList = ({ title, bugs, emptyMessage }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {bugs.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="space-y-4">
          {bugs.map(bug => (
            <div
              key={bug.id}
              onClick={() => navigate(`/bugs/${bug.id}`)}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">{bug.title}</h3>
                <p className="text-sm text-gray-500">
                  Created on {new Date(bug.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge type="priority" value={bug.priority} />
                <Badge type="status" value={bug.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const stats = [
    { label: 'Assigned', value: userBugs.assigned.length },
    { label: 'Created', value: userBugs.created.length },
    { label: 'Resolved', value: userBugs.resolved.length },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white shadow-lg rounded-2xl p-6">
              <p className="text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bug Lists */}
        <BugsList
          title="Assigned to Me"
          bugs={userBugs.assigned}
          emptyMessage="No bugs assigned to you"
        />
        <BugsList
          title="Created by Me"
          bugs={userBugs.created}
          emptyMessage="You haven't created any bugs"
        />
        <BugsList
          title="Resolved by Me"
          bugs={userBugs.resolved}
          emptyMessage="You haven't resolved any bugs"
        />
      </div>
    </div>
  );
};