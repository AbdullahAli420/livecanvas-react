import React from "react";
// import { a } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">LiveCanvas</h1>
        </div>
        <input className="block sm:hidden" type="checkbox" id="navbar-toggle" />
        <label
          className="block cursor-pointer sm:hidden"
          htmlFor="navbar-toggle"
        >
          <FaBars className="text-white" />
        </label>
        <ul className="hidden sm:flex flex-row">
          <li className="mx-4">
            <a className="text-white hover:text-gray-400" to="/">
              Home
            </a>
          </li>
          <li className="mx-4">
            <a className="text-white hover:text-gray-400" to="/about">
              About
            </a>
          </li>
          <li className="mx-4">
            <a className="text-white hover:text-gray-400" to="/contact">
              Contact
            </a>
          </li>
          <li className="mx-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <FaSignInAlt className="mr-2" /> Login
            </button>
          </li>
          <li className="mx-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <FaUserPlus className="mr-2" /> Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
