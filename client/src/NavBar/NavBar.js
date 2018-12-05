import React from 'react';
import {Link} from 'react-router-dom';
import NameSearch from './NameSearch';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-inverse bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        인싸 위키
      </Link>
      <NameSearch/> 
    </nav>
  );
}

export default NavBar;