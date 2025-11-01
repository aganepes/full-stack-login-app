import { useNavigate,Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import type { JSX } from 'react';
import type { ApiError } from '../types/user';
import styles from './styles/navbar.module.css';

function Navbar():JSX.Element {

  const {user,logout} = useAuth();
  const navigate = useNavigate();

  const hadleLogout = async()=>{

    const isLogout = await logout();

    if(!isLogout.success ){
      alert((isLogout as ApiError)?.error && 'An error occurred. Please try again.');
    }else{
      navigate('/');
    }
  
  }
  const activeStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--text-color)'
  };
  return (
    <>
    <nav className={styles.navbar}>
      <NavLink 
        to="/" 
        className={styles.navbar_link} 
        style={({isActive})=> isActive ? activeStyle : {}}
        > Home page </NavLink> 
      {!user ? (
        <>
          <NavLink 
            to="/login" 
            className={styles.navbar_link} 
            style={({isActive})=> isActive ? activeStyle : {}}
            > Login </NavLink> 
          <NavLink 
            to="/register" 
            className={styles.navbar_link} 
            style={({isActive})=> isActive ? activeStyle : {}}
            > Register </NavLink>
        </>
      ):(
        <>
          <NavLink 
            to="/dashboard" 
            className={styles.navbar_link} 
            style={({isActive})=> isActive ? activeStyle : {}}
            > Panel </NavLink> 
          <button 
            onClick={hadleLogout} 
            className={styles.navbar_link}
            > Logout ({user.name})</button>
        </>
      )}
      </nav>
      <Outlet/>
      </>
  )
}

export default Navbar;