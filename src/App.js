import React, { useState } from 'react'
import apikey from './apikey'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'
import Alert from './components/Alert'

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`

const dailyUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apikey}`

const imgUrl = (city) =>
  `https://api.teleport.org/api/urban_areas/slug:${city}/images/`

const App = () => {
  const [search, setSearch] = useState('')
  const [dataNow, setDataNow] = useState({
    tempNow: '',
    city: '',
    country: '',
    weatherNow: '',
    lat: '',
    lon: '',
  })
  const [dailyData, setDailyData] = useState(null)
  const [bgImg, setBgImg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ show: false, msg: '' })

  const showAlert = (show = false, msg = '') => {
    setAlert({ show, msg })
  }

  const getCurrentWeather = async () => {
    const resp = await fetch(url(search))
    const respData = await resp.json()
    if (respData.cod < '400') {
      showAlert(true, 'city found')
      const temp = KtoC(respData.main.temp)
      setDataNow({
        tempNow: temp,
        city: respData.name,
        country: respData.sys.country,
        weatherNow: respData.weather[0].main,
        lat: respData.coord.lat,
        lon: respData.coord.lon,
      })
      getCityImage()
      getDailyWeather(respData.coord.lat, respData.coord.lon)
      setLoading(false)
    } else {
      showAlert(true, respData.message)
    }
  }

  const getDailyWeather = async (lat, lon) => {
    const resp = await fetch(dailyUrl(lat, lon))
    const respData = await resp.json()
    setDailyData(respData.daily)
  }

  const getCityImage = async () => {
    const resp = await fetch(imgUrl(search))
    const respData = await resp.json()
    respData.photos
      ? setBgImg(respData.photos[0].image.mobile)
      : setBgImg(
          'https://media.moddb.com/images/members/4/3158/3157353/image_error_full.png'
        )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getCurrentWeather()
  }

  const KtoC = (K) => {
    return Math.floor(K - 273.15)
  }

  return (
    <main className='main'>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <div className='weather-now'>
        <form className='weather-form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            placeholder='Search by location'
            autoComplete='off'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </form>
        {!loading && <CurrentWeather dataNow={dataNow} bgImg={bgImg} />}
      </div>
      {dailyData && <DailyWeather dailyData={dailyData} KtoC={KtoC} />}
    </main>
  )
}

export default App
