let activeUnit = "C";

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

		return {
			feelsLike: today.feelslike,
			city: data.address,
			conditions: today.conditions,
			precip: today.precip,
			temperature: today.temp,
			windSpeed: today.windspeed,
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
	activeUnit = unit;
}

export function getActiveUnit() {
	return activeUnit;
}
