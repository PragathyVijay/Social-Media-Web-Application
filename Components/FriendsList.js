import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user's friends
    axios.get(`http://localhost:3001/friends/${userId}`)
      .then(response => {
        setFriends(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
        setLoading(false);
      });
  }, [userId]);

  const handleAddFriend = () => {
    if (!selectedFriend) {
      setError("Please select a friend to add");
      return;
    }

    // Send request to add friend
    axios.post('http://localhost:3001/friends/add', {
      userId: userId,
      friendId: selectedFriend
    })
    .then(response => {
      console.log("Friend added successfully");
      // Refresh friends list
      axios.get(`http://localhost:3001/friends/${userId}`)
        .then(response => {
          setFriends(response.data);
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
        });
    })
    .catch(error => {
      console.error('Error adding friend:', error);
      setError("Error adding friend. Please try again later.");
    });
  };

  return (
    <div>
      <h2>Friends List</h2>
      <div>
        <select value={selectedFriend} onChange={(e) => setSelectedFriend(e.target.value)}>
          <option value="">Select a friend</option>
          {/* Render options for each friend */}
          {friends.map(friend => (
            <option key={friend.id} value={friend.id}>{friend.name}</option>
          ))}
        </select>
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FriendsList;
