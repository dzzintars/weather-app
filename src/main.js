import "./style.css";
import * as state from "./state.js";
import * as ui from "./ui.js";

async function init() {
	const initWeatherData = await state.getWeatherData("Riga");
	ui.renderTodayWeather(initWeatherData);

	ui.bindCityInput(async (city) => {
		const weatherData = await state.getWeatherData(city);
		if (!weatherData) {
			return;
		}
		ui.renderTodayWeather(weatherData);
	});

	ui.bindCFbuttons((unit) => {
		state.setActiveUnit(unit);
		ui.updateTemperatueUnits(unit);
	});
}

init();
