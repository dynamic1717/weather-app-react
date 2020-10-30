import React from 'react'

function WeatherNowComponent(props) {
	return (
		<div className='weather-info'>
			<h3 className='place'>
				{props.city}, {props.country}
			</h3>
			<p>
				<span>{props.tempNow}°C</span>
				{props.weatherNow}
			</p>
			<img
				src={props.bgImg}
				alt={props.city}
				className='place-img'
				draggable='false'
			/>
		</div>
	)
}

export default WeatherNowComponent
