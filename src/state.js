import clearImg from "./assets/clear.svg";
import cloudyImg from "./assets/cloudy.svg";
import partlyCloudyImg from "./assets/partly-cloudy-day.svg";
import rainImg from "./assets/rainy.svg";

const weatherIconMap = {
	clear: clearImg,
	"clear-day": clearImg,
	"clear-night": clearImg,
	rainy: rainImg,
	rain: rainImg,
	cloudy: cloudyImg,
	"partly-cloudy-day": partlyCloudyImg,
};

const activeData = {
	unit: "C",
	temperature: null,
	feelsLike: null,
	forecastTemps: null,
};

export async function getWeatherData(city) {
	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=GN2MSNSFL752487QM3FC24SVY&contentType=json`,
		);
		if (!response.ok) {
			return null;
		}
		const data = await response.json();
		const today = data.currentConditions;

		activeData.temperature = today.temp;
		activeData.feelsLike = today.feelslike;
		activeData.forecastTemps = data.days.map((day) => day.temp).slice(0, 7);

		const icon = weatherIconMap[today.icon] || "";

		const forecast = data.days
			.map((day) => {
				const dateParts = day.datetime.split("-");
				const formattedDate = `${dateParts[2]}/${dateParts[1]}`;
				const temp = activeData.unit === "C" ? convertFtoC(day.temp) : day.temp;

				return {
					icon: weatherIconMap[day.icon] || "",
					temperature: temp,
					date: formattedDate,
					unit: activeData.unit,
				};
			})
			.slice(0, 7);

		return {
			city: data.address,
			temperature: getActiveTemperature(),
			feelsLike: getActiveFeelsLike(),
			conditions: today.conditions,
			windSpeed: today.windspeed,
			precip: today.precip,
			unit: activeData.unit,
			icon: icon,
			forecast: forecast,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
}

export function setActiveUnit(unit) {
	if (unit !== "C" && unit !== "F") {
		console.log("Error. Wrong Unit");
		return;
	}
	activeData.unit = unit;
}

export function getActiveUnit() {
	return activeData.unit;
}

export function getActiveTemperature() {
	if (activeData.unit === "C") {
		return convertFtoC(activeData.temperature);
	} else {
		return activeData.temperature;
	}
}

export function getActiveFeelsLike() {
	if (activeData.unit === "C") {
		return convertFtoC(activeData.feelsLike);
	} else {
		return activeData.feelsLike;
	}
}

export function getActiveForecastTemps() {
	if (activeData.unit === "C") {
		return activeData.forecastTemps.map((t) => {
			return convertFtoC(t);
		});
	} else {
		return activeData.forecastTemps;
	}
}

function convertFtoC(temperature) {
	return Math.round(((temperature - 32) / 1.8) * 10) / 10;
}
