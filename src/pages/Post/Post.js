import styles from './Post.module.css';

// Hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {

    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className={styles.postContainer}>
            {loading && (
                <p>Loading...</p>
            )}
            {post && (
                <>
                    <div>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt={post.title} />
                        <p>{post.body}</p>
                        <h3>Tags:</h3>
                        <div className={styles.tags}>
                            {post.tagsArray.map((tag, index) => (
                                <p key={index}><span>#</span>{tag}</p>
                            ))}
                        </div>
                        <p className={styles.author}>Post created by: @{post.createdBy}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default Post