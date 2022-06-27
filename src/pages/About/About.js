import styles from './About.module.css';

import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className={styles.about}>
            <h2>About Mini<span>Blog</span></h2>
            <p>This project is a blog made with react for the frontend and Google Firebase for the backend.</p>
            <Link to="/posts/create" className="btn">Create a Post</Link>
        </div>
    )
}

export default About