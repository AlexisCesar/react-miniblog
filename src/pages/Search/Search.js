import styles from './Search.module.css';

import { Link } from 'react-router-dom';

// Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// Components
import PostDetail from '../../components/PostDetail';

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const {documents: posts} = useFetchDocuments("posts", search);
  
  return (
    <div className={styles.searchContainer}>
      <h2>Results for: {search}</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>There is no results to this search :(</p>
            <Link to="/" className='btn'>Return to Home</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Search