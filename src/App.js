import { useEffect, useState } from "react";
import "./App.css";

const api = {
  key: "3607032a70c795cdc523f907688a1092",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({
    location: "",
    country: "",
    temp: 0,
    feelsLike: 0,
    description: "",
    humidity: 0,
    windSpeed: 0,
    windDeg: 0,
    visibility: 0,
    pressure: 0,
    clouds: 0,
    sunrise: 0,
    sunset: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setWeatherInfo({
            ...weatherInfo,
            location: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            description: data.weather.description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            visibility: data.visibility,
            pressure: data.main.pressure,
            clouds: data.clouds.all,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          });
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button style={styles.button}> Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div style={styles.container}>
              <div style={styles.wrapper}>
                {/* Main Weather Card */}
                <div style={styles.mainCard}>
                  <div style={styles.header}>
                    <div>
                      <h1 style={styles.location}>{weatherInfo.location}</h1>
                      <p style={styles.description}>
                        {weatherInfo.description}
                      </p>
                    </div>
                    <svg
                      style={styles.cloudIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                  </div>

                  <div style={styles.tempContainer}>
                    <div style={styles.tempMain}>{weatherInfo.temp}°</div>
                    <div style={styles.tempUnit}>C</div>
                  </div>

                  <div style={styles.feelsLike}>
                    Feels Like is {weatherInfo.feelsLike}°C
                  </div>
                </div>

                {/* Details Grid */}
                <div style={styles.grid}>
                  {/* Humidity */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#60a5fa" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                      <span style={styles.cardLabel}>Humidity</span>
                    </div>
                    <div style={styles.cardValue}>{weatherInfo.humidity}%</div>
                  </div>

                  {/* Wind */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#22d3ee" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                      </svg>
                      <span style={styles.cardLabel}>Wind</span>
                    </div>
                    <div style={styles.cardValue}>{weatherInfo.windSpeed}</div>
                    <div style={styles.cardUnit}>m/s</div>
                  </div>

                  {/* Visibility */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#a78bfa" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span style={styles.cardLabel}>Visibility</span>
                    </div>
                    <div style={styles.cardValue}>{weatherInfo.visibility}</div>
                    <div style={styles.cardUnit}>km</div>
                  </div>

                  {/* Pressure */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#4ade80" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 12H7" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span style={styles.cardLabel}>Pressure</span>
                    </div>
                    <div style={styles.cardValue}>{weatherInfo.pressure}</div>
                    <div style={styles.cardUnit}>hPa</div>
                  </div>

                  {/* Sunrise */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#fb923c" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 18a5 5 0 0 0-10 0" />
                        <line x1="12" y1="2" x2="12" y2="9" />
                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                        <line x1="1" y1="18" x2="3" y2="18" />
                        <line x1="21" y1="18" x2="23" y2="18" />
                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                        <line x1="23" y1="22" x2="1" y2="22" />
                        <polyline points="8 6 12 2 16 6" />
                      </svg>
                      <span style={styles.cardLabel}>Sunrise</span>
                    </div>
                    <div style={styles.cardValue}>
                      {formatTime(weatherInfo.sunrise)}
                    </div>
                  </div>

                  {/* Sunset */}
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <svg
                        style={{ ...styles.icon, color: "#f472b6" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 18a5 5 0 0 0-10 0" />
                        <line x1="12" y1="9" x2="12" y2="2" />
                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                        <line x1="1" y1="18" x2="3" y2="18" />
                        <line x1="21" y1="18" x2="23" y2="18" />
                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                        <line x1="23" y1="22" x2="1" y2="22" />
                        <polyline points="16 5 12 9 8 5" />
                      </svg>
                      <span style={styles.cardLabel}>Sunset</span>
                    </div>
                    <div style={styles.cardValue}>
                      {formatTime(weatherInfo.sunset)}
                    </div>
                  </div>
                </div>

                {/* Cloud Coverage */}
                <div style={styles.cloudCard}>
                  <div style={styles.cloudHeader}>
                    <span style={styles.cloudLabel}>Clouds</span>
                    <span style={styles.cloudPercent}>
                      {weatherInfo.clouds}%
                    </span>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${weatherInfo.clouds}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #374151, #1f2937, #111827)",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  form: {
    background: "linear-gradient(to bottom right, #374151, #1f2937, #111827)",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  input: {
    height: "30px",
    width: "30%",
  },

  button: {
    height: "40px",
    width: "10%",
    margin: "10px",
  },
  wrapper: {
    maxWidth: "896px",
    width: "100%",
  },
  mainCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "32px",
    marginBottom: "24px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "32px",
  },
  location: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "white",
    margin: "0 0 8px 0",
  },
  description: {
    color: "#d1d5db",
    fontSize: "18px",
    textTransform: "capitalize",
    margin: 0,
  },
  cloudIcon: {
    width: "80px",
    height: "80px",
    color: "#d1d5db",
  },
  tempContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: "16px",
    marginBottom: "32px",
  },
  tempMain: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "white",
    lineHeight: 1,
  },
  tempUnit: {
    fontSize: "36px",
    color: "#d1d5db",
    paddingBottom: "16px",
  },
  feelsLike: {
    color: "#d1d5db",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
  cardLabel: {
    color: "#d1d5db",
    fontSize: "14px",
  },
  cardValue: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
  },
  cardUnit: {
    color: "#9ca3af",
    fontSize: "14px",
    marginTop: "4px",
  },
  cloudCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  cloudHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  cloudLabel: {
    color: "#d1d5db",
  },
  cloudPercent: {
    color: "white",
    fontWeight: "bold",
  },
  progressBar: {
    width: "100%",
    backgroundColor: "#374151",
    borderRadius: "9999px",
    height: "12px",
    overflow: "hidden",
  },
  progressFill: {
    background: "linear-gradient(to right, #9ca3af, #d1d5db)",
    height: "100%",
    borderRadius: "9999px",
    transition: "width 0.5s ease",
  },
};

export default App;
