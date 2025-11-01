import React,{useEffect, useState, type JSX} from 'react';
import { useAuth } from '../hooks/AuthHook';
import { Link, useNavigate } from 'react-router-dom';
import type { ApiError, ApiResponse } from '../types/user';
import styles from './styles/login.module.css';

function LoginPage():JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');

    const {user,login} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[user,navigate]);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const isLogin = await login({email,password});
        if(isLogin.success){
            alert((isLogin as ApiResponse).message);
            navigate('/');
        }else{
            setError((isLogin as ApiError).error && 'An error occurred. Please try again.');
        }
        setLoading(false);
    }
    return (
        <div className={styles.login_container}>
            <h2 className={styles.login_title}>Login Account</h2>
            <p className={styles.login_description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur obcaecati quas facere, iste nesciunt illo. Asperiores, quae esse ipsam </p>
            <form onSubmit={handleSubmit} className={styles.login_form}>
                <div className={styles.email_container}>
                    <input 
                        type="email"
                        value={email}
                        placeholder='Email ID'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='off'
                        autoFocus
                    />
                </div>
                <div className={styles.password_container}>
                    <input 
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className={styles.checkbox_container}>
                    
                    <input 
                        type="checkbox"
                        id="check"
                        required
                        hidden
                    />
                    <div className={styles.check_box_element}></div>
                    <label htmlFor="check" className={styles.checkbox_label}>Keep me signed in</label>
                    <Link to="/register" className={styles.register_link}>Already a member?</Link>
                </div>
                <button type="submit" className={styles.submit_button}>Login</button>
            </form>
            {error && <p className={styles.error_message}>{error}</p>}
            {loading && <p className={styles.loading_message}>Loading...</p>}
        </div>
    )
}

export default LoginPage;