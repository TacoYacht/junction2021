import { Footer } from './components/Footer';
import { Header } from './components/Header';
import logo from './assets/logo.svg';
import { Switch, Route } from "wouter";

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route path="/">
            <h2>Re-love</h2>
          </Route>
          <Route path="/explore">
            <h2>Explore</h2>
          </Route>
          <Route path="/my-products">
            <h2>My products</h2>
          </Route>
          <Route path="/discussion">
            <h2>Discuss</h2>
          </Route>
          <Route path="/profile">
            <h2>My profile</h2>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
