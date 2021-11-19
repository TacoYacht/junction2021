import logo from './assets/logo.svg';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="app-content">
        <div className="row">
          <h2>Sell</h2>
          <h2>Swap</h2>
          <h2>Upcycle</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
