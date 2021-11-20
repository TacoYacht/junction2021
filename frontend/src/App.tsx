import { Switch, Route } from "wouter";

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OpenCollection } from "./components/shop/OpenCollection";
import { Shop } from "./components/shop/Shop";
import { CategoryEnum } from "./data/model";

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <Switch>
          <Route path="/">
            <Shop />
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
          <Route path="/shop/:category" component={OpenCollection} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
