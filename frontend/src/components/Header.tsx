import * as React from "react";
import { Link, useLocation } from "wouter";

import '../styles/Header.css';

import { ReactComponent as SavedIcon } from '../assets/saved.svg';
import { ReactComponent as ShoppingCartIcon } from '../assets/shopping_cart.svg';
import { ReactComponent as PlusIcon } from '../assets/plus.svg';

export const Header = () => {
    const [location] = useLocation();
    const activePage = location === "/" ? "shop" : location.split("/")[1];

    const pages: Record<string, string> = {
        "shop": "Shop",
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
                {activePage !== "my-items" && (
                    <React.Fragment>
                        <SavedIcon />
                        <ShoppingCartIcon />
                    </React.Fragment>
                )}
                {activePage === "my-items" && (
                    <Link to="/add-item">
                        <PlusIcon className="add-item" />
                    </Link>
                )}
            </div>
        </header>
    );
}