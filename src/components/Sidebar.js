import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingBag, FaBookmark } from 'react-icons/fa';

import './Sidebar.css';

function Sidebar() {

  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
          <Link to="/pedidos" className={`sidebar-link ${location.pathname === '/pedidos' ? 'active' : ''}`}>
            <FaShoppingBag className="icon" />
            <span>Pedidos</span>
          </Link>
          <Link to="/reservas" className={`sidebar-link ${location.pathname === '/reservas' ? 'active' : ''}`}>
            <FaBookmark className="icon" />
            <span>Reservas</span>
          </Link>
      </div>
    </div>
  );
}

export default Sidebar;