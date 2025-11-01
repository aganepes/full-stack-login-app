import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import NotFoundPage from '../pages/NotFoundPage';
import Navbar from './Navbar';

function Routers() {
  return (
    <>
  <Routes>
    <Route path="/" element={<Navbar/>}>
      <Route  index element={<HomePage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="dashboard" element={<DashboardPage/>}/>
    </Route>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes>
    </>
  )
}

export default Routers