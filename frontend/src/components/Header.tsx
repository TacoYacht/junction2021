import * as React from "react";
import { useLocation } from "wouter";

import '../styles/Header.css';

import { ReactComponent as SavedIcon } from '../assets/saved.svg';
import { ReactComponent as ShoppingCartIcon } from '../assets/shopping_cart.svg';
import { Search } from "./Search";

export const Header = () => {
    const [location, setLocation] = useLocation();

    const pages: Record<string, string> = {
        "/": "Shop",
        "/explore": "Explore",
        "/my-products": "My products",
        "/discussion": "Discussion",
        "/profile": "Profile",
    }

    function getActivePage(): string {
        return pages[location];
    }

  return (
    <header className="App-header">
        <div className="top-bar">
            <h2 className="page-name">{getActivePage()}</h2>
            <SavedIcon />
            <ShoppingCartIcon />
        </div>
        <Search />
    </header>
  );
}