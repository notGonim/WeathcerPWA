import './App.css';
import { useState } from 'react';
import { fetchWeather } from './API/FetchWether';

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})

  const Search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(city)
      setWeather(data)
      setCity('')

    }
  }


  return (
    <div className="main-container">
      <input type="text" className="search" placeholder="Search..."
        value={city} onChange={(e) => setCity(e.target.value)} onKeyPress={Search} />
   
    </div>
  );
}

export default App;
