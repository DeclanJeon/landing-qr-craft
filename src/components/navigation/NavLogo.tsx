
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="text-2xl font-bold flex items-center">
      <span className="text-primary-100">Peer</span>
      <span className="text-accent-100">mall</span>
    </Link>
  );
};

export default NavLogo;
