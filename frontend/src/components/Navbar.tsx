import { Link,useNavigate,Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import type { JSX } from 'react';

function Navbar():JSX.Element {

  const {user,logout} = useAuth();
  const navigate = useNavigate();

  const hadleLogout = async()=>{

    const isLogout = await logout();

    if(!isLogout.success ){
      alert(isLogout?.error && 'An error occurred. Please try again.');
    }else{
      navigate('/');
    }
  
  }

  return (
    <>
    <nav>
      <Link to="/">Home page</Link> |
      {!user ? (
        <>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>  
        </>
      ):(
        <>
          <Link to="/dashboard">Panel</Link> |
          <button onClick={hadleLogout}>Logout ({user.name})</button>
        </>
      )}
      </nav>
      <hr/>
      <Outlet/>
      </>
  )
}

export default Navbar;