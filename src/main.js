import "./style.css";
import * as state from "./state.js";
import * as ui from "./ui.js";

async function init() {
	const initWeatherData = await state.getWeatherData("Riga");
	ui.renderTodayWeather(initWeatherData, state.getActiveUnit());

	ui.bindCityInput(async (city) => {
		const weatherData = await state.getWeatherData(city);
		if (!weatherData) {
			ui.renderCityError(city);
			return;
		}

		ui.renderTodayWeather(weatherData);
	});

	ui.bindUnitbuttons(async (unit) => {
		if (state.getActiveUnit() !== unit) {
			state.setActiveUnit(unit);
			ui.updateTemperatureUnits(
				unit,
				state.getActiveTemperature(),
				state.getActiveFeelsLike(),
			);
		}
	});
}

init();
