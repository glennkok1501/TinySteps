import { Link, useLocation } from 'react-router-dom';
import { mdiHome, mdiCash, mdiBookmarkOutline, mdiCreation, mdiMenu, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import LogoutBtn from './LogoutBtn';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const navItems = [
        { path: '/', icon: mdiHome, title: 'Home' },
        { path: '/financialsupport', icon: mdiCash, title: 'Financial Support' },
        { path: '/bookmarks', icon: mdiBookmarkOutline, title: 'Bookmarks' },
        { path: '/assistant', icon: mdiCreation, title: 'Assistant' }
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button 
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle navigation"
            >
                <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="brand">
                    <Link to="/" className="brand-link">
                        Tiny Steps
                    </Link>
                </div>

                <ul className="nav-menu">
                    {navItems.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <Link 
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon 
                                    path={item.icon} 
                                    size={1} 
                                    className="nav-icon"
                                />
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-footer">
                    <LogoutBtn />
                </div>
            </nav>
        </>
    );
};

export default Sidebar; 