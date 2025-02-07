// src/components/ProfileCard.jsx
import React, { useState } from 'react';

const ProfileCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
        <p className="text-gray-500 text-sm">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;