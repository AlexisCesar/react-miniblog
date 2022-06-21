import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='nav-bar'>
        <NavLink to="/" className='nav-logo'>Mini<span className='logo-blog'>Blog</span></NavLink>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">...</NavLink>
            <NavLink to="/">...</NavLink>
        </nav>
    </div>
  )
}

export default Navbar