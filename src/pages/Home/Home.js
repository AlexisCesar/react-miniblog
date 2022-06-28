import styles from './Home.module.css';

// Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import PostDetail from '../../components/PostDetail';

const Home = () => {

    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const { documents: posts, loading } = useFetchDocuments("posts");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(query) {
            return navigate(`/search?q=${query}`);
        }
    }

    return (
        <div className={styles.home}>
            <h1>New posts</h1>
            <form onSubmit={handleSubmit} className={styles.searchForm} >
                <input type="text" placeholder='Search post by tag...' onChange={(e) => setQuery(e.target.value)} value={query} />
                <button className='btn btn-dark'>Search</button>
            </form>
            <div>
                {loading && (<p>Loading...</p>)}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
                {posts && posts.length === 0 && (
                    <div className={styles.noPosts}>
                        <p>Oh no! There's no posts yet :(</p>
                        <Link to="/posts/create" className='btn'>Let's change this, start a new post now!</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home