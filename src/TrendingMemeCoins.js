import React, { useState, useEffect } from 'react';

function TrendingCoin() {
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    // Fetch the trending coins
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then(response => response.json())
      .then(data => {
        // Get the ID of the top trending coin
        const topCoinId = data.coins[0].item.id;

        // Fetch the price data for the top trending coin
        return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${topCoinId}&vs_currencies=usd&include_24hr_change=true`);
      })
      .then(response => response.json())
      .then(priceData => {
        const topCoinData = priceData[Object.keys(priceData)[0]];
        setCoin({
          price: topCoinData.usd,
          change: topCoinData.usd_24h_change,
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!coin) return <p>Loading...</p>;

  return (
    <div>
      <h2>Top Trending Coin</h2>
      <p>Price: ${coin.price}</p>
      <p>24h Change: {coin.change.toFixed(2)}%</p>
    </div>
  );
}

export default TrendingCoin;
