import React from 'react'
import WeekdayItem from './WeekdayItem'

function getWeekDay(days = 0) {
  const date = new Date()
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const day = date.getDay() + days
  return weekDays[day % 7]
}

const DailyWeather = (props) => {
  const icon = (i) =>
    `https://openweathermap.org/img/w/${props.dailyData[i].weather[0].icon}.png`

  const tempDay = (i) => props.KtoC(props.dailyData[i].temp.day)

  const dailyItems = props.dailyData.map((item, index) => {
    if (index < 5) {
      return (
        <WeekdayItem
          key={index}
          index={index}
          getWeekDay={getWeekDay}
          icon={icon}
          tempDay={tempDay}
        />
      )
    } else {
      return null
    }
  })

  return (
    <div className='weather-daily'>
      <ul className='weather-daily-list'>{dailyItems}</ul>
    </div>
  )
}

export default DailyWeather
