import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="px-2 pb-24">
      {/* Hero Section */}
      <div className="max-w-xl mx-auto mt-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-[max(4vw,36px)] font-bold leading-tight">
          Largest <br /> Crypto Marketplace
        </h1>
        <p className="text-gray-300 w-3/4 leading-relaxed">
          Welcome to the world's largest cryptocurrency Marketplace. Sign up to explore more about cryptos.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center justify-between w-4/5 bg-white rounded-md px-3 py-2 gap-3">
          <input
            onChange={inputHandler}
            value={input}
            list="coinlist"
            type="text"
            placeholder="search crypto..."
            required
            className="flex-1 outline-none text-black text-base"
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-[#7927ff] text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700 transition">
            Search
          </button>
        </form>
      </div>

      {/* Crypto Table */}
      <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] p-4 items-center border-b border-gray-600 text-sm font-medium">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right hidden sm:block">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] p-4 items-center border-b border-gray-600 hover:bg-white/5 transition-all text-sm">
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-9 sm:w-9" />
              <p>
                {item.name} - {item.symbol.toUpperCase()}
              </p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={`text-center ${
                item.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="text-right hidden sm:block">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
