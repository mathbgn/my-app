import React, { useState, useEffect } from 'react';

function TrendingCoin() {
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((response) => response.json())
      .then((trendingData) => {
        const topTrendingCoin = trendingData.coins[0].item;
        const imageUrl = topTrendingCoin.large; // Coin's image URL
        const coinId = topTrendingCoin.id;
        return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`)
          .then((response) => response.json())
          .then((priceData) => {
            setCoin({
              id: coinId,
              image: imageUrl,
              price: priceData[coinId].usd,
              change: priceData[coinId].usd_24h_change,
            });
          });
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  if (!coin) return <div>Loading...</div>;

  return (
    <div>
      <h2>{coin.id.toUpperCase()}</h2>
      <img src={coin.image} alt="Coin" />
      <p>Price: ${coin.price}</p>
      <p>24h Change: {coin.change.toFixed(2)}%</p>
    </div>
  );
}

export default TrendingCoin;
