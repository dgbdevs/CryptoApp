import { useState, useEffect } from 'react'

function App() {

  const [coins, setCoins] = useState([]);

  //traigo monedas de coingecko
  const updateCoins = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => setCoins(data))
  }



  useEffect(() => { updateCoins() }, [])

  return (
    <div>
      <div>
        <h1>CryptoApp</h1>
      </div>

      <div className='itemlist'>
        <div className='col-3'>
          Coin
        </div>

        <div className='col-2'>
          Price
        </div>
        <div className='col-3'>
          24Hs Change
        </div>
        <div className='col-2'>
          Marketcap
        </div>
        <div className='col-1'>
          Ranking
        </div>
      </div>
      {coins?
      <div className='items-container'>
        {coins.map((coin, index) => {
          return (
            <div key={index} className='itemlist'>
              <div className='d-flex col-3'>
                <div style={{marginLeft:'5px'}}><img src={coin.image} style={{ width: '20px' }}></img></div>
                <div style={{marginLeft:'5px'}}>{coin.name}</div>
                <div style={{marginLeft:'5px',color:'#666'}}>{coin.symbol.toUpperCase()}</div>
              </div>
              <div className='col-2'>
                ${coin.current_price}
              </div>
              <div className='col-3'>
                {coin.price_change_percentage_24h > 0 ?
                  <div className='percentage'><div style={{ color: 'green' }}>{coin.price_change_percentage_24h} %</div></div>
                  :
                  <div className='percentage'><div style={{ color: 'red' }}>{coin.price_change_percentage_24h} %</div></div>
                }
              </div>
              <div className='col-2'>
                {coin.market_cap}
              </div>
              <div className='col-1'>
                {coin.market_cap_rank}
              </div>
            </div>
          )
        })}
      </div>
      :
      <></>
      }
    </div>
  )
}

export default App
