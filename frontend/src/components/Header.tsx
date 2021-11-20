import * as React from "react";
import { useLocation } from "wouter";

import { Search } from "./Search";

export const Header = () => {
    const [location, setLocation] = useLocation();

  return (
    <header className="App-header">
        {location}
        <Search />
    </header>
  );
}