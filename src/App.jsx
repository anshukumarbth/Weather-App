import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("bihar");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [windMph, setWindMph] = useState("");
  const [windKph, setWindKph] = useState("");
  const [direction, setDirection] = useState("");
  const [degree, setDegree] = useState("");
  const [searchQuery, setSearchQuery] = useState("bihar");
  const [image1, setImage] = useState("url('./image/cold.jpeg')");

  // Fetch Weather Data
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=e35baa74b0784415b1960237253001&q=${data}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.location && res.current) {
          setCountry(res.location.country);
          setState(res.location.region);
          setCelsius(res.current.temp_c);
          setFahrenheit(res.current.temp_f);
          setWindMph(res.current.wind_mph);
          setWindKph(res.current.wind_kph);
          setDegree(res.current.wind_degree);
          setDirection(res.current.wind_dir);
          setHumidity(res.current.humidity);
          setPressure(res.current.pressure_in);
        } else {
          alert("Invalid location, please enter a valid city/state.");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data.");
      });
  }, [data]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setData(searchQuery);
  };

  useEffect(() => {
    if (celsius !== "") {
      if (celsius <= 0) {
        setImage("url('./image/freezing.jpeg')");
      } else if (celsius > 0 && celsius <= 15) {
        setImage("url('./image/cold.jpeg')");
      } else if (celsius > 15 && celsius <= 30) {
        setImage("url('./image/warm.jpeg')");
      } else {
        setImage("url('./image/hot.jpeg')");
      }
    }
  }, [celsius]);

  return (
    <>
      <h1 className="font-bold text-center text-transparent text-8xl bg-gradient-to-r from-purple-200 via-pink-400 to-red-600 bg-clip-text ">
        Weather App
      </h1>
      <div className="absolute flex flex-wrap justify-center w-5/12 p-2 font-mono text-white transform -translate-x-1/2 -translate-y-1/2 border-2 border-black border-solid cursor-pointer top-1/2 left-1/2 h-4/6 rounded-3xl backgoundimage">
        <div className="flex justify-center w-full gap-2 p-2 mt-2 rounded h-14">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search..."
            className="w-full p-2 font-bold text-center text-black border-none outline-one rounded-3xl"
            onChange={handleInputChange}
          />
          <button
            className="w-24 text-lg font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="relative flex flex-col items-start justify-center gap-3 bottom-12">
          <h1 className="ml-20 text-3xl text-transparent bg-gradient-to-r from-purple-200 via-pink-400 to-red-600 bg-clip-text">
            Address the weather condition
          </h1>
          <div className="flex flex-wrap justify-center w-full gap-2">
            <div className="w-5/6 h-16 py-1 font-serif text-xl font-bold text-center border-2 border-black border-solid rounded hover:bg-green-300">
              <h3>Country/State/City</h3>
              {country} / {state} / {data}
            </div>
            <div className="w-5/6 h-16 py-1 font-serif text-xl font-bold text-center border-2 border-black border-solid rounded hover:bg-green-300">
              <h3>Temperature in Celsius</h3>
              {celsius}°C
            </div>
            <div className="w-5/6 h-16 py-1 font-serif text-xl font-bold text-center border-2 border-black border-solid rounded hover:bg-green-300">
              <h3>Temperature in Fahrenheit</h3>
              {fahrenheit}°F
            </div>
            <div className="w-5/6 h-16 py-1 font-serif text-xl font-bold text-center border-2 border-black border-solid rounded hover:bg-green-300">
              <h3>Humidity & Pressure</h3>
              {humidity}% / {pressure} in
            </div>
            <div className="w-5/6 h-16 py-1 font-serif text-xl font-bold text-center border-2 border-black border-solid rounded hover:bg-green-300">
              <h3>Wind (Speed, Direction)</h3>
              {windMph} mph / {windKph} kph / {degree}° / {direction}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
