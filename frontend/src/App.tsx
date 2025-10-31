import { type JSX } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Routers from './components/Routers';


function App(): JSX.Element {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </AuthProvider>
  )
}
export default App;