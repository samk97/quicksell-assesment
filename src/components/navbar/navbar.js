import React, { useEffect, useState, useRef } from "react";
import Dropdown from "../dropdown/dropdown";
import './navbar.css';
import { useDataApi } from "../../context/ApiContext";

function Navbar() {
  // State to keep track of whether the dropdown is visible or not
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // Ref to the dropdown element
  const dropdownRef = useRef(null);

  // Function to toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  // Function to handle changes to the grouping dropdown
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    updateGroupFilter(value);
    closeDropdown(); // Close the dropdown when an option is chosen
  };

  // Function to handle changes to the ordering dropdown
  const handleDropdownChange2 = (event) => {
    const value = event.target.value;
    updateOrderFilter(value);
    closeDropdown(); // Close the dropdown when an option is chosen
  };

  // Effect to add an event listener to detect clicks outside of the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the updateGroupFilter and updateOrderFilter functions from the ApiContext
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