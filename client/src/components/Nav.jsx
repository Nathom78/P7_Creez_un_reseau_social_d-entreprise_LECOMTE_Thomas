import React from 'react';
import {NavLink} from 'react-router-dom';
import Logout from './log/Logout';

const Nav = () => {

    return (
        <nav className='iconsNav'>
            <NavLink to='/my-post' className='new-post'>
            <button className='nouvelle__publication'>Nouvelle publication</button>
            </NavLink>
                
            <NavLink to='/profil' className='iconUser_container'>
            <i className="fas fa-user" ></i>            
            </NavLink>
            
            <Logout />
        </nav>
    );
};

export default Nav;