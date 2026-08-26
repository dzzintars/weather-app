import clearImg from "./assets/clear.svg";
import rainImg from "./assets/rainy.svg";
import cloudyImg from "./assets/cloudy.svg";
import partlyCloudyImg from "./assets/partly-cloudy-day.svg";

const weatherIconMap = {
	clear: clearImg,
	"clear-day": clearImg,
	"clear-night": clearImg,
	rainy: rainImg,
	rain: rainImg,
	cloudy: cloudyImg,
	"partly-cloudy-day": partlyCloudyImg,
};

console.log(rainImg);
const activeData = {
	unit: "C",
	temperature: null,
	feelsLike: null,
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
		console.log(data);

		activeData.temperature = today.temp;
		activeData.feelsLike = today.feelslike;

		today.temp = getActiveTemperature();
		today.feelslike = getActiveFeelsLike();

		const icon = weatherIconMap[today.icon] || "";

		return {
			feelsLike: today.feelslike,
			city: data.address,
			conditions: today.conditions,
			precip: today.precip,
			temperature: today.temp,
			windSpeed: today.windspeed,
			unit: activeData.unit,
			icon: icon,
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
		return Math.round(((activeData.temperature - 32) / 1.8) * 10) / 10;
	} else {
		return activeData.temperature;
	}
}

export function getActiveFeelsLike() {
	if (activeData.unit === "C") {
		return Math.round(((activeData.feelsLike - 32) / 1.8) * 10) / 10;
	} else {
		return activeData.feelsLike;
	}
}
