import * as React from "react";

import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as CameraIcon } from '../assets/camera.svg';

import '../styles/Search.css';

export const Search = ({ setFilter }: { setFilter }) => {

  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <CameraIcon className="camera-icon" />
      <input type="text" placeholder="Search" onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
} 