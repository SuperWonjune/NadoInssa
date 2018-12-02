import React from 'react';
import {Link} from 'react-router-dom';
import NameSearch from './NameSearch';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand mb-0 h1" to="/">
        인싸 위키
      </Link>
      <NameSearch/> 
    </nav>
  );
}

export default NavBar;