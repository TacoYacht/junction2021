import { Switch, Route, Redirect } from "wouter";

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AddNew } from "./components/my-items/AddNew";
import { MyItems } from "./components/my-items/MyItems";
import { Shop } from "./components/shop/Shop";
import { Profile } from "./components/Profile";

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <Switch>
          <Route path="/" component={Shop} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/:category" component={Shop} />
          <Route path="/my-items">
            <MyItems />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/add-item">
            <AddNew />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
