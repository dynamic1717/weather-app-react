import React from 'react'

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

function WeatherDailyComponent(props) {
	const icon = (i) =>
		`https://openweathermap.org/img/w/${props.dailyData[i].weather[0].icon}.png`

	const tempDay = (i) => props.KtoC(props.dailyData[i].temp.day)

	const dailyItems = props.dailyData.map((item, index) => {
		if (index < 5) {
			return (
				<li key={index} className='weather-daily-item'>
					{index === 0 ? getWeekDay(index) + ' (today)' : getWeekDay(index)}
					<p>
						{tempDay(index)}°
						<img src={icon(index)} alt='' />
					</p>
				</li>
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

export default WeatherDailyComponent
