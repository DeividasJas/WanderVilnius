import '../styles/ToursDropdown.modules.css';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
function ToursDropdown() {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li
      className={`w-fit ${
        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
      } rounded-lg px-3 py-1 link dropdown`}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      Tours
      <div className={`dropdown-menu flex flex-col items-start ${isOpen ? 'active' : ''}`}>
        <Link to={'/tours/group'}>Group</Link>
        <Link to={'/tours/individual'}>Individual</Link>
      </div>
    </li>
  );
}

export default ToursDropdown;
