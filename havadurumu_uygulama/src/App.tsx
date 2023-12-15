import { useState, useEffect } from 'react';
import './App.css';
import Days from './components/Days';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TbLocationFilled } from 'react-icons/tb';
import { FaSearchLocation } from 'react-icons/fa';
import { render } from 'react-dom';
import Errormodal from './components/Errormodal';

//ist konum api = https://api.open-meteo.com/v1/forecast?latitude=41.0138&longitude=28.9497&current=temperature_2m&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=3

function App() {
  const [coordinates, setCoordinates] = useState({
    longitude: '28.94966',
    latitude: '41.01384',
  });
  const [tempCity, setTempCity] = useState('Istanbul');
  const [temperature, setTemperature] = useState('Loading...');
  const [city, setCity] = useState();
  const [precipitation, setPrecipitation] = useState('Loading...');
  const [wind, setWind] = useState('Loading...');
  const [dayTempsmax, setDaytempsmax] = useState([]);
  const [dayTempsmin, setDaytempsmin] = useState([]);
  const [date, setDate] = useState([]);
  const [response, setResponse] = useState({});
  const [visible, setVisible] = useState(2);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTemperature(
          response.current.temperature_2m +
            response.current_units.temperature_2m
        );
        setPrecipitation(
          response.current.precipitation + response.current_units.precipitation
        );
        setWind(
          response.current.wind_speed_10m +
            response.current_units.wind_speed_10m
        );
        setDaytempsmax(response.daily.temperature_2m_max);
        setDaytempsmin(response.daily.temperature_2m_min);
        setDate(response.daily.time);
      });
  }, [coordinates]);

  const handleGetWeather = async () => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })

      .then((response) => {
        setResponse(response);
        setCity(response.results[0].name);
        setTempCity(response.results[0].name);
        setCoordinates({
          latitude: response.results[0].latitude,
          longitude: response.results[0].longitude,
        });
        setVisible(Object.keys(response).length)
      });
  };

  return (
    <>
      {temperature ? (
        <div className="h-[900px] w-full bg-sky-500 flex flex-col items-center justify-center p-11">
          <div className="h-[600px] w-[490px] rounded-lg object-contain overflow-auto items-center p-2 ">
            <div className="flex flex-row h-[40px] items-center justify-center">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search For a Location..."
                className="resize-none w-[490px] h-[40px] outline-none rounded-3xl text-center items-center text-blue-300 text-xl transition ease-in-out delay-150 hover:-translate-y-1hover:tra"
              ></input>
              <i className="ml-4" onClick={() => handleGetWeather()}>
                <FaSearchLocation className="text-white text-3xl text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110" />
              </i>
            </div>
            <div className="flex flex-row items-center">
              <TbLocationFilled className="text-5xl text-white font-extrabold"></TbLocationFilled>
              <h1 className="font-bold text-6xl text-white p-3">{tempCity}</h1>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="p-4 text-5xl font-thin text-white mt-1">
                Today {tempCity} is
              </span>
              <span className=" text-6xl font-bold text-white">
                {temperature}
              </span>
              <div className="flex flex-row m-3 gap-4 text-white">
                <span>Precipitation: {precipitation} </span>
                <span>Wind Speed: {wind}</span>
              </div>
              <span className="font-black text-white text-lg">
                DAILY WEATHER
              </span>
            </div>
            <div className="w-full h-auto grid grid-cols-3 grid-rows-2 justify-items-center text-center rounded-2xl p-3 border-4 border-white text-white">
              {date.map((date) => (
                <>
                  <span>{date}</span>
                </>
              ))}

              {dayTempsmax.map((maxData, index) => (
                <span>Highest {maxData}°C</span>
              ))}
              {dayTempsmin.map((minData) => (
                <span>Lowest {minData + 1}°C</span>
              ))}
            </div>
            {console.log(visible)}
            <div onClick={()=>{setVisible(1)}}><Errormodal visible={visible}></Errormodal>
            </div>
          </div>
          <a href="https://github.com/Yusagca">Github/Yusagca</a>
        </div>
      ) : (
        <p>Veri yükleniyor</p>
      )}
    </>
  );
}

export default App;
