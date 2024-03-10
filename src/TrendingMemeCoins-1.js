import React, { useState, useEffect } from 'react';

function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/search/trending';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const trending = data.coins.slice(0, 3).map((trend) => trend.item); // Get the top 3 trending coins
        // For price and variation, an additional call to the coins' individual endpoint would be needed
        setTrendingCoins(trending);
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
      <h2>Top 3 Trending Coins:</h2>
      {trendingCoins.map((coin, index) => (
        <div key={index} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <h3>{coin.name} ({coin.symbol})</h3>
          <img src={coin.large} alt={coin.name} height="30" />
          {/* Price and 24h variation are not available in the trending endpoint response */}
        </div>
      ))}
    </div>
  );
}

export default TrendingCoins;
