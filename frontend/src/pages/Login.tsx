import React,{useEffect, useRef, useState, type JSX} from 'react';
import { useAuth } from '../hooks/AuthHook';
import { Link, useNavigate } from 'react-router-dom';
import type { ApiError } from '../types/user';
import styles from './styles/login.module.css';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

function LoginPage():JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');
    const [showLoginMessage,setShowLoginMessage] = useState<boolean>(false);

    const checkRef = useRef(null);

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
        if(!checkRef.current?.checked) 
            return ;
        setLoading(true);
        
        const isLogin = await login({email,password});
        if(isLogin.success){
            setShowLoginMessage(true);
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
                        required
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
                    <div className={styles.switch_container}>
                        <input 
                            type="checkbox"
                            id="check"
                            name='check-doc'
                            required
                            hidden
                            ref={checkRef}                            
                        />
                        <div className={styles.check_box_element} style={checkRef.current?.checked && {border: 'none'}}></div>
                        <label htmlFor="check" className={styles.checkbox_label}>Keep me signed in</label>
                    </div>
                    <Link to="/register" className={styles.register_link}>Already a member?</Link>
                </div>
                <button type="submit" className={styles.submit_button}>subscribe</button>
            </form>
            {error && <p className={styles.error_message}>{error}</p>}
            {loading && <Loading />}
            {showLoginMessage && <Alert message="Login successful!" />}
        </div>
    )
}

export default LoginPage;