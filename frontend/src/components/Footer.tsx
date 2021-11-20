import * as React from "react";
import { Link, useRoute, useLocation } from "wouter";

import { ReactComponent as M } from '../assets/m_logo.svg';
import { ReactComponent as ShopIcon } from '../assets/shop.svg';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as MessageIcon } from '../assets/message.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import '../styles/Footer.css';

const ActiveLink = (props: any) => {
    const [location] = useLocation();
    const isActive = location.startsWith(props.href);
    const [isActive2] = useRoute(props.href2);

    return (
        <Link {...props}>
            <a className={isActive || (props.href2 !== undefined && isActive2) ? "active" : ""}>{props.children}</a>
        </Link>
    );
};

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-block">
            <ActiveLink href="/shop" href2="/">
                <ShopIcon title="Shop" />
                Shop
            </ActiveLink>
        </div>
        <div className="footer-block">  
            <ActiveLink href="/explore">
                <SearchIcon title="Explore" />
                Explore
            </ActiveLink>
        </div>
        <div className="footer-block">
            <ActiveLink href="/my-items">
                <M title="My items" className="marimekko-icon" />
                My items
            </ActiveLink>
        </div>
        <div className="footer-block">
            <ActiveLink href="/profile">
                <UserIcon title="Profile" />
                Profile
            </ActiveLink>
        </div>
    </div>
  );
}