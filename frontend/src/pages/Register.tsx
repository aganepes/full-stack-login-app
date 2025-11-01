import React,{useRef, useState, type JSX} from 'react';
import { useAuth } from '../hooks/AuthHook';
import { Link, useNavigate } from 'react-router-dom';

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
            confirmPasswordInput.current?.focus();
            return ;
        }

        const isRegister = await register({name,email,password});

        if(isRegister.success){
            alert(isRegister.message);
            navigate('/');
        }else{
            setError(isRegister.error);
        }
        
        setLoading(false);
    }
    return (
        <div>
            <h2>Register</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        id='name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        id='email'
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirm-password'>Confirm Password:</label>
                    <input 
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ref={confirmPasswordInput}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div>
                <p style={{display:'inline',padding:'10px'}}>Have me Account?</p>
                <Link to="/login" style={{display:'inline'}}>Login Here</Link>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {loading && <p style={{color: 'green'}}>Loading ...</p>}
        </div>
    )
}

export default RegisterPage;