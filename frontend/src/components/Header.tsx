import * as React from "react";
import { useLocation } from "wouter";

import '../styles/Header.css';

import { ReactComponent as SavedIcon } from '../assets/saved.svg';
import { ReactComponent as ShoppingCartIcon } from '../assets/shopping_cart.svg';
import { Search } from "./Search";

export const Header = () => {
    const [location] = useLocation();
    const activePage = location === "/" ? "shop" : location.split("/")[1];

    const pages: Record<string, string> = {
        "shop": "Shop",
        "explore": "Explore",
        "my-items": "My items",
        "profile": "Profile",
        "add-item": "Add new item",
    }

    function getActivePage(): string {
        return pages[activePage];
    }

    return (
        <header className="header">
            <div className="top-bar">
                <h2 className="page-name">{getActivePage()}</h2>
                <SavedIcon />
                <ShoppingCartIcon />
            </div>
        </header>
    );
}