import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        인싸 위키
      </Link>
      <div class="col-xs-2">
      
      </div>
      <form class="form-inline">
      <input
            type="search"
            className="form-control mr-sm-2"
            placeholder="검색"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
       </form>
      
    </nav>
  );
}

export default NavBar;