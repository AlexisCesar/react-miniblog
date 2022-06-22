import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navBar}>
        <NavLink to="/" className={styles.navLogo}>Mini<span className={styles.logoBlog}>Blog</span></NavLink>
        <nav>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>Sign in</NavLink>
            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>Register</NavLink>
            <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : "")}>About</NavLink>
        </nav>
    </div>
  )
}

export default Navbar