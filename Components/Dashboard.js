import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PostForm from './PostForm'; 
import PostsFeed from './PostsFeed';
import FriendsList from './FriendsList';

const Dashboard = () => {
  const location = useLocation();
  const userId = location.state ? location.state.userId : null;

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts
    axios.get('http://localhost:3001/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    // Fetch user's friends
    if (userId) {
      axios.get(`http://localhost:3001/friends/${userId}`)
        .then(response => {
          setFriends(response.data);
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <PostForm userId={userId} />
      { (
        <div>
          <PostsFeed posts={posts} />
          <FriendsList friends={friends} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
