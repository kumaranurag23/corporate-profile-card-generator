
import React, { useState } from 'react';
import { PlusCircle, Download, Edit2, Trash2, X } from 'lucide-react';

// UserList Component
const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map(user => (
        <ProfileCard 
          key={user.id} 
          user={user} 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};


export default UserList;