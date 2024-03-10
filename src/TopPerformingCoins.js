import React, { useState, useEffect } from 'react';

function TopPerformingCoins() {
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const topPerformers = data.filter(coin => coin.price_change_percentage_24h >= 100).slice(0, 3);
        setTopCoins(topPerformers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Top Performing Coins:</h2>
      {topCoins.map((coin, index) => (
        <div key={index} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <h3>{coin.name} ({coin.symbol})</h3>
          <p>Price: ${coin.current_price}</p>
          <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}

export default TopPerformingCoins;
