import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Validates URL
    try {
      let x = new URL(image);
    } catch (error) {
      setFormError("The image has to be a link address!");
      return;
    }

    // Create tag array
    let tagsArray = [];
    if(tags !== "")
       tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Verify values
    if(!title || !image || !body) {
      setFormError("There are missing information!");
      return;
    }

    // Send doc to Firebase
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirect to Home
    navigate("/");
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <p>Share something with the world!</p>
      <form onSubmit={handleSubmit}>
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            required
            placeholder={'Your post\'s title'}
            autoComplete='no'
            onChange={(e) => { setTitle(e.target.value) }}
            value={title}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            required
            placeholder={'The link to any image on internet'}
            autoComplete='no'
            onChange={(e) => { setImage(e.target.value) }}
            value={image}
          />
        </label>
        <label>
          <span>Content:</span>
          <textarea
            name="body"
            required
            placeholder={'Your post\'s content'}
            autoComplete='no'
            onChange={(e) => { setBody(e.target.value) }}
            value={body}
          >
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder={'Use tags to reach more people! *Separated by comma: like, this'}
            autoComplete='no'
            onChange={(e) => { setTags(e.target.value) }}
            value={tags}
          />
        </label>
        {!response.loading && <button className='btn'>Create Post</button>}
        {response.loading && <button className='btn' disabled>Please wait...</button>}
      </form>
    </div>
  )
}

export default CreatePost