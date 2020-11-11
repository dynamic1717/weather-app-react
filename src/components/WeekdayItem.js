import React from 'react'

const WeekdayItem = (props) => {
  const { index, tempDay, getWeekDay, icon } = props

  return (
    <li className='weather-daily-item'>
      {index === 0 ? getWeekDay(index) + ' (today)' : getWeekDay(index)}
      <p>
        {tempDay(index)}°
        <img src={icon(index)} alt='' />
      </p>
    </li>
  )
}

export default WeekdayItem
