import styles from './NotFound.module.css';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className={styles.notFound}>
                <h2>Oops! This page was not found! :(</h2>
                <Link to="/" className='btn'>Return to Home</Link>
            </div>
            </>
    )
}

export default NotFound