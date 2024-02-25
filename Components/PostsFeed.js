import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts
    axios.get('http://localhost:3001/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleLike = (postId) => {
    // Send a request to like the post
    // For demo, just update the state locally
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    // Implement comment functionality
    console.log(`Commented on post with ID ${postId}`);
  };

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:3001/posts/${postId}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== postId));
        console.log(`Deleted post with ID ${postId}`);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h2>Posts Feed</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          {posts.map(post => (
            <div key={post.id} style={styles.postContainer}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Posted at: {new Date(post.createdAt).toLocaleString()}</p>
              <div>
                <IconButton onClick={() => handleLike(post.id)} style={styles.iconButton}>
                  <FavoriteIcon color="secondary" />
                  <span>{post.likes}</span>
                </IconButton>
                <IconButton onClick={() => handleComment(post.id)} style={styles.iconButton}>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(post.id)} style={styles.iconButton}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  postContainer: {
    border: '1px solid white',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  iconButton: {
    marginRight: '10px',
  },
};

export default PostsFeed;
