import RouterPage from './pages/RouterPage';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterPage>
          <Signup />
          <Login />
          <Home />
          
        </RouterPage>
      </header>
    </div>
  );
}

export default App;
