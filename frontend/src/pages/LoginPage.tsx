import React,{useEffect, useState, type JSX} from 'react';
import { useAuth } from '../hooks/AuthHook';
import { Link, useNavigate } from 'react-router-dom';

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
    },[user])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const isLogin = await login({email,password});
        if(isLogin.success){
            alert(isLogin.message);
            navigate('/');
        }else{
            setError(isLogin.error && 'An error occurred. Please try again.');
        }
        setLoading(false);
    }
    return (
        <div>
            <h2>Login</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur obcaecati quas facere, iste nesciunt illo. Asperiores, quae esse ipsam iste necessitatibus, repellat quidem officiis quam corporis reiciendis ducimus fuga laudantium veniam debitis, assumenda dolorem blanditiis minus quis hic. </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email"
                        value={email}
                        placeholder='Email Id'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div style={{display:"inline"}}>
                    <input 
                        type="checkbox"
                        id="check"
                        required
                    />
                    <label htmlFor="check">Keep me signed in</label>
                    <Link to="/register">Already a member?</Link>
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {loading && <p style={{color: 'green'}}>Loading...</p>}
        </div>
    )
}

export default LoginPage;