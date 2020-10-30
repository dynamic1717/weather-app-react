import React from 'react'
import WeatherNowComponent from './components/WeatherNowComponent'
import WeatherDailyComponent from './components/WeatherDailyComponent'

const apikey = 'bb0881b4a10457e0352e46584cd5082c'

const url = (city) =>
	`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`

const dailyUrl = (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apikey}`

const imgUrl = (city) =>
	`https://api.teleport.org/api/urban_areas/slug:${city}/images/`

class App extends React.Component {
	state = {
		search: '',
		dataNow: [],
		tempNow: '',
		city: '',
		country: '',
		weatherNow: '',
		bgImg: '',
		lat: '',
		lon: '',
		dailyData: '',
	}

	async getDailyWeather() {
		const resp = await fetch(dailyUrl(this.state.lat, this.state.lon))
		const respData = await resp.json()
		this.setState({ dailyData: respData.daily })
	}

	async getCityImage() {
		const resp = await fetch(imgUrl(this.state.search))
		const respData = await resp.json()
		respData.photos
			? this.setState({ bgImg: respData.photos[0].image.mobile })
			: this.setState({
					bgImg:
						'https://media.moddb.com/images/members/4/3158/3157353/image_error_full.png',
			  })
	}

	KtoC(K) {
		return Math.floor(K - 273.15)
	}

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(url(this.state.search))
			.then((resp) => resp.json())
			.then((resp) => {
				if (resp.cod !== '404' && resp.cod !== '400') {
					const temp = this.KtoC(resp.main.temp)
					this.setState({
						dataNow: resp,
						tempNow: temp,
						city: resp.name,
						country: resp.sys.country,
						weatherNow: resp.weather[0].main,
						lat: resp.coord.lat,
						lon: resp.coord.lon,
					})
					this.getDailyWeather()
					this.getCityImage()
				} else {
					alert(resp.message)
				}
			})
	}

	render() {
		return (
			<main className='main'>
				<div className='weather-now'>
					<form className='weather-form' onSubmit={this.handleSubmit}>
						<input
							type='text'
							name='search'
							placeholder='Search by location'
							autoComplete='off'
							value={this.state.search}
							onChange={this.handleChange}
						/>
						<button>Search</button>
					</form>
					{this.state.tempNow === '' ? null : (
						<WeatherNowComponent {...this.state} />
					)}
				</div>
				{this.state.dailyData === '' ? null : (
					<WeatherDailyComponent {...this.state} KtoC={this.KtoC} />
				)}
			</main>
		)
	}
}

export default App
