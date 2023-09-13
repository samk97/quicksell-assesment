import React, { useEffect, useState, useRef } from "react";
import Dropdown from "../dropdown/dropdown";
import './navbar.css';
import { useDataApi } from "../../context/ApiContext";

function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref to the dropdown element

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    updateGroupFilter(value);
    closeDropdown(); // Close the dropdown when an option is chosen
  };

  const handleDropdownChange2 = (event) => {
    const value = event.target.value;
    updateOrderFilter(value);
    closeDropdown(); // Close the dropdown when an option is chosen
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { updateGroupFilter, updateOrderFilter } = useDataApi();

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item ">
            <a className="home-link" href="#" onClick={toggleDropdown}>
              Display <span className="dropdown-indicator">&#9662;</span>
            </a>
            <ul
              ref={dropdownRef} // Attach the ref to the dropdown element
              className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}
            >
              <li className="dropdown-item">
                <div className="dropdown-item-filter">
                  <div className="dropdown-item-filter-left">Grouping</div>
                  <select className="home-link2" onChange={handleDropdownChange}>
                    <option value="user">User</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </li>
              <li className="dropdown-item">
                <div className="dropdown-item-filter">
                  <div className="dropdown-item-filter-left">Ordering</div>
                  <select className="home-link2" onChange={handleDropdownChange2}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
