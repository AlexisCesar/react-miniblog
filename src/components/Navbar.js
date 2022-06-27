import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../hooks/useAuthentication';

import { useAuthValue } from '../context/AuthContext';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();

  return (
    <div className={styles.navBar}>
      <NavLink to="/" className={styles.navLogo}>Mini<span className={styles.logoBlog}>Blog</span></NavLink>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
        {!user && (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Sign in</NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>Create a Post</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink>
          </>
        )}
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>About</NavLink>
        {user && (
          <>
            <button onClick={logOut} className={styles.signOut}>Sign out</button>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar