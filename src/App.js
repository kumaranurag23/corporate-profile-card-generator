import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Download, X } from 'lucide-react';
import './styles.css';

// ProfileCard Component
const ProfileCard = ({ user, onEdit, onDelete }) => {
  const handleDownload = () => {
    if (user?.imageUrl) {
      const link = document.createElement('a');
      link.href = user.imageUrl;
      link.download = `${user.name}-profile.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div 
      className="rounded-lg shadow-lg overflow-hidden"
      style={{ backgroundColor: user.backgroundColor || '#ffffff' }} // Apply background color
    >
      <div className="relative">
        <img 
          src={user.imageUrl || "/api/placeholder/300/200"} 
          alt={user.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={() => onEdit(user)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-600 mb-2">{user.designation}</p>
        <p className="text-gray-600 mb-2">{user.companyName}</p>
        <p className="text-gray-600 mb-2">{user.location}</p>
        <p className="text-gray-500 text-sm mb-3">{user.bio}</p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Download className="w-4 h-4" />
          Download Photo
        </button>
      </div>
    </div>
  );
};

// EditForm Component
const EditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    bio: '',
    designation: '',
    companyName: '',
    location: '',
    imageUrl: '',
    backgroundColor: '#ffffff' // Default background color
  });
  const [imagePreview, setImagePreview] = useState(user?.imageUrl || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {user ? 'Edit Profile' : 'Create Profile'}
          </h2>
          <button onClick={onCancel} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Image</label>
            <div className="flex items-center space-x-4">
              <img
                src={imagePreview || "/api/placeholder/100/100"}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input
              type="color"
              value={formData.backgroundColor}
              onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
              className="w-full p-1 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load users from localStorage on initial mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSave = (userData) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...userData, id: user.id } : user
      ));
    } else {
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center px-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Profiles</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5 " />
            Add User
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {users.map(user => (
            <ProfileCard 
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {isFormOpen && (
          <EditForm
            user={editingUser}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;