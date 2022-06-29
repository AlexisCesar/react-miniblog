import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {

  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  useEffect(() => {

    if (post) {

      if (post.uid != user.uid) {
        navigate("/");
      }

      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }

  }, [post]);


  const { updateDocument, response } = useUpdateDocument("posts");


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
    if (tags !== "")
      tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Verify values
    if (!title || !image || !body) {
      setFormError("There are missing information!");
      return;
    }

    // Send doc to Firebase
    updateDocument(id, {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    // Redirect to Home
    navigate("/dashboard");
  };

  return (
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editing Post: "{post.title}"</h2>
          <p>You can change the informations below</p>
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
            <p className={styles.previewTitle}>Image preview:</p>
            <img className={styles.imagePreview} src={image} alt={post.title}/>
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
            {!response.loading && <button className='btn'>Edit Post</button>}
            {response.loading && <button className='btn' disabled>Please wait...</button>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost