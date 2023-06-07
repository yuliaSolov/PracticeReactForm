import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [newPostTitle, setPostNewTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const translatedData = await response.json();
        // console.log(translatedData);
        setAllPosts(translatedData.posts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlogPosts();
  }, []);

  async function sendNewPostRequest(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostBody,
        }),
      });

      const translatedData = await response.json();

      let newPostObject = {
        name: translatedData.id,
      };

      setAllPosts([...allPosts, newPostObject]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>All Posts</h2>
      {allPosts.length ? (
        allPosts.map((posts, idx) => {
          return (
            <div key={idx}>
              <p> {posts.posts} </p>
            </div>
          );
        })
      ) : (
        <p> Please Wait...</p>
      )}

      <form onSubmit={sendNewPostRequest}>
        <label htmlFor="new-post-title">
          Enter The New Blog Post Title Below:
        </label>
        <br />
        <input
          title="new-post-title"
          type="text"
          placeholder="New post Title Goes Here"
          value={newPostTitle}
          onChange={(event) => {
            setPostNewTitle(event.target.value);
          }}
        ></input>

        <label htmlFor="new-post-body">Enter New Blog Post Below:</label>
        <br />
        <input
          title="new-post-body"
          type="text"
          placeholder="New Product Description Goes Here"
          value={newPostBody}
          onChange={(event) => {
            setNewPostBody(event.target.value);
          }}
        ></input>

        <button type="submit"> Submit </button>
      </form>
    </>
  );
}

export default App;

//2

/*import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const translatedData = await response.json();
        setAllPosts(translatedData.posts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlogPosts();
  }, []);

  async function sendNewPostRequest(event) {
    event.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostBody,
        }),
      });

      const translatedData = await response.json();

      let newPostObject = {
        name: translatedData.id,
      };

      setAllPosts([...allPosts, newPostObject]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>All Posts</h2>
      {allPosts.length ? (
        allPosts.map((post, idx) => (
          <div key={idx}>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </div>
        ))
      ) : (
        <p>Please Wait...</p>
      )}

      <form onSubmit={sendNewPostRequest}>
        <label htmlFor="new-post-title">Enter The New Blog Post Title Below:</label>
        <br />
        <input
          id="new-post-title"
          type="text"
          placeholder="New post Title Goes Here"
          value={newPostTitle}
          onChange={(event) => {
            setNewPostTitle(event.target.value);
          }}
        />

        <label htmlFor="new-post-body">Enter New Blog Post Below:</label>
        <br />
        <input
          id="new-post-body"
          type="text"
          placeholder="New Product Description Goes Here"
          value={newPostBody}
          onChange={(event) => {
            setNewPostBody(event.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App; */
