import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import LineChart from '../components/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY,
      },
    };
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((data) => setCoinData(data))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY,
      },
    };
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((data) => setHistoricalData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]);

  if (coinData && historicalData) {
    return (
      <div className="px-5">
        <div className="flex flex-col items-center gap-5 mt-24 mb-12">
          <img src={coinData.image.large} alt={coinData.name} className="w-24" />
          <p className="text-4xl font-medium font-outfit">
            <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
          </p>
        </div>

        <div className="max-w-xl h-[250px] mx-auto">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="max-w-xl mx-auto mt-12 flex flex-col gap-2 text-white">
          {[
            ['Crypto Market Rank', coinData.market_cap_rank],
            ['Current Price', `${currency.symbol}${coinData.market_data.current_price[currency.name].toLocaleString()}`],
            ['Market Cap', `${currency.symbol}${coinData.market_data.market_cap[currency.name].toLocaleString()}`],
            ['24 Hour High', `${currency.symbol}${coinData.market_data.high_24h[currency.name].toLocaleString()}`],
            ['24 Hour Low', `${currency.symbol}${coinData.market_data.low_24h[currency.name].toLocaleString()}`],
          ].map(([label, value], index) => (
            <ul key={index} className="flex justify-between border-b border-gray-500 py-2 list-none">
              <li className="font-outfit text-base">{label}</li>
              <li className="font-outfit font-light text-gray-200">{value}</li>
            </ul>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#4500c6] rounded-full animate-spin"></div>
      </div>
    );
  }
};

export default Coin;
