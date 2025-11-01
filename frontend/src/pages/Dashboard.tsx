import { useEffect, useState,type JSX } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/public/vite.svg';
import { useAuth } from '../hooks/AuthHook';
// import type { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

function App():JSX.Element {

  const [count, setCount] = useState(0);

  const {user,Loading} = useAuth();

  const navigator = useNavigate();

  useEffect(()=>{
    if(!user && Loading){
      navigator("/login");
    }
  },[user,Loading]);

  return Loading ? (<div>Loading...</div>) : (<>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {user && (
        <>
        <p className="read-the-docs">
          <strong>Id:</strong>{user.id}
        </p>
        <p className="read-the-docs">
          <strong>Name:</strong>{user.name}
        </p>
        <p className="read-the-docs">
          <strong>Email:</strong>{user.email}
        </p>
         <p className="read-the-docs">
          <strong>Create account:</strong>{Date(user.createAt).split('GMT+0500')[0]}
        </p>
        </>
      )}
      
    </>);
}

export default App;
