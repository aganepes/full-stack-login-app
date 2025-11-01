import { useEffect, useState,type JSX } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/public/vite.svg';
import { useAuth } from '../hooks/AuthHook';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/Loading';
import'./styles/dashboard.css';

function App():JSX.Element {
  const [count, setCount] = useState(0);
  const {user,Loading} = useAuth();
  const navigator = useNavigate();

  const getDate=(d:string):string=>{
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2,'0');
    const month = (date.getMonth()+1).toString().padStart(2,'0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}ý.`;
  }

  useEffect(()=>{
    if(!user && Loading){
      navigator("/login");
    }
  },[user,Loading]);

  return Loading ? (<LoadingComponent />) : (<div className="App">
      <div className="topLogos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {user && (
        <div className="userData">
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
            <strong>Create account:</strong>{getDate(user.createdAt)}
          </p>
        </div>
      )}
      
    </div>);
}

export default App;
