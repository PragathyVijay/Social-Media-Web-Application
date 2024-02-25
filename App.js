import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import PostsFeed from './components/PostsFeed';
import FriendsList from './components/FriendsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/postsfeed" element={<PostsFeed />} />
        <Route path="/friendslist" element={<FriendsList />} />
      </Routes>
    </Router>
  );
}

export default App;
