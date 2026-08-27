import "./style.css";
import * as state from "./state.js";
import * as ui from "./ui.js";

async function init() {
	ui.renderLoading();
	const initWeatherData = await state.getWeatherData("Riga");
	ui.renderWeather(initWeatherData);

	ui.bindCityInput(async (city) => {
		ui.renderLoading();
		const weatherData = await state.getWeatherData(city);
		if (!weatherData) {
			ui.renderCityError(city);
			return;
		}

		ui.renderWeather(weatherData);
	});

	ui.bindUnitbuttons(async (unit) => {
		if (state.getActiveUnit() !== unit) {
			state.setActiveUnit(unit);
			ui.updateTemperatureUnits(
				unit,
				state.getActiveTemperature(),
				state.getActiveFeelsLike(),
				state.getActiveForecastTemps(),
			);
		}
	});
}

init();
