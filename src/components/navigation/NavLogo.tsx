
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
      <span>Peermall</span>
    </Link>
  );
};

export default NavLogo;
