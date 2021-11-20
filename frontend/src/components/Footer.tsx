import * as React from "react";
import { Link } from "wouter";

import M from '../assets/m_logo.svg';
import placeholder from '../assets/placeholder.png';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-block">
            <Link href="/">
                <img src={placeholder} alt="Shop" />
                Shop
            </Link>
        </div>
        <div className="footer-block">
            <Link href="/explore">
                <img src={placeholder} alt="Explore" />
                Explore
            </Link>
        </div>
        <div className="footer-block">
            <Link href="/my-products">
                <img src={M} alt="My products" />
                My products
            </Link>
        </div>
        <div className="footer-block">
            <Link href="/discussion">
                <img src={placeholder} alt="Discussion" />
                Discussion
            </Link>
        </div>
        <div className="footer-block">
            <Link href="/profile">
                <img src={placeholder} alt="Profile" />
                Profile
            </Link>
        </div>
    </div>
  );
}