import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown/dropdown";
import './navbar.css';
import { useDataApi } from "../../context/ApiContext";
function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };





  const { updateGroupFilter, updateOrderFilter } = useDataApi();


  const handleDropdownChange = (event) => {
    const value = event.target.value
    updateGroupFilter(value);

  };
  const handleDropdownChange2 = (event) => {
    const value = event.target.value
    updateOrderFilter(value)
  };




  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item ">
            <a className="home-link" href="#" onClick={toggleDropdown}>Display <span className="dropdown-indicator">&#9662;</span></a>
            <ul className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}>
              <li className="dropdown-item">
                <div className="dropdown-item-filter">
                  <div className="dropdown-item-filter-left">
                    Grouping
                  </div >
                  <select className="home-link2" onChange={handleDropdownChange}>

                    <option value="user">User</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>


                </div>
              </li>
              <li className="dropdown-item">
                <div className="dropdown-item-filter">
                  <div className="dropdown-item-filter-left">
                    Ordering
                  </div >

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
