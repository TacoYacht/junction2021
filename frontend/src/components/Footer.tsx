import * as React from "react";
import { Link, useRoute } from "wouter";

import { ReactComponent as M } from '../assets/m_logo.svg';
import { ReactComponent as ShopIcon } from '../assets/shop.svg';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as MessageIcon } from '../assets/message.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import '../styles/Footer.css';

const ActiveLink = (props: any) => {
    const [isActive] = useRoute(props.href);

    return (
        <Link {...props}>
            <a className={isActive ? "active" : ""}>{props.children}</a>
        </Link>
    );
};

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-block">
            <ActiveLink href="/">
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
            <ActiveLink href="/my-products">
                <M title="My products" className="marimekko-icon" />
                My products
            </ActiveLink>
        </div>
        <div className="footer-block">
            <ActiveLink href="/discussion">
                <MessageIcon title="Discussion"  />
                Discussion
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