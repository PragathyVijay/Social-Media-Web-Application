import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ userId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("Please enter some content");
      return;
    }

    axios.post('http://localhost:3001/posts', {
      userId: userId,
      content: content
    })
    .then(response => {
      console.log("Post created successfully");
      setContent("");
    })
    .catch(error => {
      console.error('Error creating post:', error);
      alert("Error creating post. Please try again later.");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            rows="5"
            cols="35"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..."
            required
          />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
