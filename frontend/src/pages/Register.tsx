import React,{useRef, useState, type JSX} from 'react';
import { useAuth } from '../hooks/AuthHook';
import { Link, useNavigate } from 'react-router-dom';
import type { ApiError, ApiResponse } from '../types/user';
import styles from '../pages/styles/register.module.css';
import Loading from '../components/Loading';

function RegisterPage():JSX.Element {
    const [email,setEmail] = useState<string>('');
    const [name,setName] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const confirmPasswordInput = useRef(null);
    const [error,setError] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        setError('');
        setLoading(true);
        
        if(confirmPassword!=password){
            setError("Confirm password and password do not match");
            (confirmPasswordInput.current as HTMLInputElement).focus();
            return ;
        }

        const isRegister = await register({name,email,password});

        if(isRegister.success){
            alert((isRegister as ApiResponse).message);
            navigate('/');
        }else{
            setError((isRegister as ApiError).error);
        }
        
        setLoading(false);
    }

    return (
        <div className={styles.register_container}>
            <h2 className={styles.register_title}>Register</h2>
            <hr />
            <form onSubmit={handleSubmit} className={styles.register_form}>
                <div className={styles.name_container}>
                    <input
                        id='name'
                        type="text"
                        value={name}
                        placeholder='Name'
                        autoComplete='off'
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.email_container}>
                    <input 
                        id='email'
                        type="email"
                        value={email}
                        placeholder='Email'
                        required
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.password_container}>
                    <input 
                        id="password"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className={styles.confirm_password_container}>
                    <input 
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ref={confirmPasswordInput}
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit" className={styles.submit_button}>Sign Up</button>
            </form>
            <div className={styles.login_redirect}>
                <p className={styles.login_redirect_text}>Have me Account ?</p>
                <Link to="/login" className={styles.login_redirect_link}> Login Here</Link>
            </div>
            {error && <p className='error_message'>{error}</p>}
            {loading && <Loading />}
        </div>
    )
}

export default RegisterPage;