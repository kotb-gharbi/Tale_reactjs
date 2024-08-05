import React, { useState } from 'react';
import './Navbar.css';
import Roles from './Roles.jsx';
import Dash from './Dash.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './Users.jsx';
import Sanctions from './Sanctions.jsx';
import Reclamations from './Reclamations.jsx';
import Approbation from './Approbation.jsx';
import Analyse from './Analyse.jsx';
import Support from './Support.jsx';

function Navbar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Router>
      <div className="d-flex justify-content-between mt-3">
        <div>
          <img src="/tale-logo.png" alt="Tale" className='tale pointer' />
          <img src="/menu.png" alt="menu" className='menu pointer' onClick={() => setExpanded((prev) => !prev)} />
        </div>
        <div>
          <img src="/mail.png" alt="mail" className='MailBell pointer' />
          <img src="/bell.png" alt="bell" className='MailBell left pointer' />
        </div>
      </div>
      <img src="/arrow.png" alt="down arrow" className='arrow pointer' />

      <div className="container-fluid">
        <div className="row mt-2 d-flex">
          <div className="col-md-2" style={{maxWidth: 'fit-content'}}>
            <div className={`sidebar ${expanded ? 'sidebar-active'  : ''}`}>
            <ul className='elements'>
              <NavLink to='/dashboard' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/dashboard-colored.png" : "/dashboard.png"} alt="dashboard" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Tableau de Bord</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/gestion-des-utilisateur' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/users-colored.png" : "/users.png"} alt="users" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Gestion des Utilisateurs</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/sanctions' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/sanction-colored.png" : "/sanction.png"} alt="sanction" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Gestion des Sanctions</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/reclamations' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className='ligne'>
                      <img src={isActive ? "/reclamation-colored.png" : "/reclamation.png"} alt="reclamation" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Réclamations des Clients</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/approbation' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/approbation-colored.png" : "/approbation.png"} alt="approbation" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Approbation des Contenus</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/roles' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/roles-colored.png" : "/roles.png"} alt="roles" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Gestion des Rôles et Permissions</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/analyse' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/analyse-colored.png" : "/analyse.png"} alt="analyse" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Analyse et Reporting</span>}
                    </div>
                  </li>
                )}
              </NavLink>
              <NavLink to='/support' className="sidebar-link">
                {({ isActive }) => (
                  <li className={`item pointer ${isActive ? 'active' : ''}`}>
                    <div className="ligne">
                      <img src={isActive ? "/support-colored.png" : "/support.png"} alt="support" className='sideimg' />
                      {expanded && <span className={`title ${isActive ? 'active-title' : ''}`}>Centre de Support</span>}
                    </div>
                  </li>
                )}
              </NavLink>
            </ul>
            <div className='copyright-line'></div>
              {expanded ? (
                <div className='copyright'>© 2024 Tale. All rights reserved.</div>
              ) : (
                <div className='copyright-notexpanded'>© Tale</div>
              )}
          </div>
          </div>
          
          <div className='col ps-0'>
            <Routes>
              <Route path='/roles' element={<Roles />} />
              <Route path='/dashboard' element={<Dash />} />
              <Route path='/gestion-des-utilisateur' element={<Users />} />
              <Route path='/sanctions' element={<Sanctions />} />
              <Route path='/reclamations' element={<Reclamations />} />
              <Route path='/approbation' element={<Approbation />} />
              <Route path='/analyse' element={<Analyse />} />
              <Route path='/support' element={<Support />} />
            </Routes>
            <div className="footer">

          </div>
          </div>
          
        </div>
      </div>
    </Router>
  );
}

export default Navbar;
