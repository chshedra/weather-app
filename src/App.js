import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const[data, setData] = useState({});
  const[newLocation, setNewLocation] = useState('');
  const[location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=57c1f07c087c19cde2f87f0e70c80032`;

  const handleLocationEnter = (event) =>{
    if(event.key === 'Enter'){
      setLocation(newLocation);
    }
  }

  const searchLocation = () =>
  {
     axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setNewLocation('');
  }

  useEffect(() => {
    searchLocation(location);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      searchLocation(location);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
        value={newLocation}
        onChange={event => setNewLocation(event.target.value)}
        onKeyPress={handleLocationEnter}
        placeholder='Enter location'
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPS</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
