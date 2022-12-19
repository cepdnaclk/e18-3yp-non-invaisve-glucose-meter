import RouterPage from './pages/RouterPage';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterPage>
          <Signup />
          <Login />
          
        </RouterPage>
      </header>
    </div>
  );
}

export default App;
