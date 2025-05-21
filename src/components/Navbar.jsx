import React, { useContext } from 'react';
import arrow_icon from '../assets/arrow_icon.png';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd':
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      default:
        setCurrency({ name: 'usd', symbol: '$' });
    }
  };

  return (
    <nav className="flex items-center justify-between px-[10%] py-5 border-b-2 border-gray-700 text-gray-200">
      <Link to="/">
        <h1
          className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none cursor-pointer hover:scale-105 transition-transform duration-300">
          CryptoRadar
        </h1>
      </Link>

      <ul className="hidden md:flex gap-10 list-none">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <li className="cursor-pointer hover:text-white transition">Features</li>
        <li className="cursor-pointer hover:text-white transition">Pricing</li>
        <li className="cursor-pointer hover:text-white transition">Blog</li>
      </ul>

      <div className="flex items-center gap-4">
        <select
          onChange={currencyHandler}
          className="bg-transparent border-2 border-white rounded-md px-3 py-1 text-white text-sm outline-none">
          <option value="usd" className="bg-[#09005c] text-white">USD</option>
          <option value="eur" className="bg-[#09005c] text-white">EUR</option>
          <option value="inr" className="bg-[#09005c] text-white">INR</option>
        </select>

        <button className="flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition">
          Sign up
          <img src={arrow_icon} alt="arrow" className="w-[13px]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
