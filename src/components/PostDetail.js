import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
    return (
        <div className={styles.postDetail}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <div className={styles.tags}>
                {post.tagsArray.map((tag, index) => (
                    <p key={index}><span>#</span>{tag}</p>
                ))}
            </div>
            <p className={styles.createdBy}>{post.createdBy}</p>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Read Post</Link>
        </div>
    )
}

export default PostDetail