import React from 'react'

const CurrentWeather = (props) => {
  const { city, country, tempNow, weatherNow } = props.dataNow
  const { bgImg } = props

  return (
    <div className='weather-info'>
      <h3 className='place'>
        {city}, {country}
      </h3>
      <p>
        <span>{tempNow}°C</span>
        {weatherNow}
      </p>
      <img src={bgImg} alt={city} className='place-img' draggable='false' />
    </div>
  )
}

export default CurrentWeather
