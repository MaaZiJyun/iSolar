// src/app/test/page.tsx
'use client';

import { useState } from 'react';

export default function TestPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();

      if (res.ok) {
        setUsers(data.data);
        setMessage('Users fetched successfully!');
      } else {
        setMessage(data.error || 'Error fetching users');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  // 添加新用户
  const addUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'User added successfully!');
        fetchUsers(); // 更新用户列表
        setName(''); // 清空输入框
        setEmail('');
      } else {
        setMessage(data.error || 'Error adding user');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test API with MySQL</h1>
      
      <div>
        <h2>Fetch Users</h2>
        <button onClick={fetchUsers}>Get Users</button>
        <ul>
          {users.map((user: any, index) => (
            <li key={index}>
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Add User</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={addUser}>Add User</button>
      </div>

      {message && (
        <div style={{ marginTop: '2rem', color: 'green' }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
}
