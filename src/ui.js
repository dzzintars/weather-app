const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const todayDiv = document.querySelector("#today-div");
const headerBtnDiv = document.querySelector("#header-buttons");

export function renderTodayWeather(data) {
	const time = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	todayDiv.innerHTML = `
        <div class="today-header">
        <h2>Current weather</h2>
        <h2>${data.city}</h2>
        <p class="current-time">${time}</p>
      </div>
      <div class="today-data-div">
        <div class="today-temper-div">
          <p id="temper-para">${data.temperature}°C</p>
          <p id="condition-para">${data.conditions}</p>
        </div>
        <div class="today-side-container">
          <div class="today-extra-data-div">
            <p>Wind</p>
            <p class="today-data-para">${data.windSpeed} km/h</p>
          </div>
          <div class="today-extra-data-div">
            <p>Feels like</p>
            <p class="today-data-para">${data.feelsLike}°C</p>
          </div>
          <div class="today-extra-data-div">
            <p>Precipitation</p>
            <p class="today-data-para">${data.precip} mm</p>
          </div>
        </div>
      </div>
    
    `;
}

export function bindCFbuttons(callback) {
	headerBtnDiv.addEventListener("click", (e) => {
		const unit = e.target.getAttribute("data-unit");
		if (unit) {
			callback(unit);
		}
	});
}

export function bindCityInput(callback) {
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault();
		callback(cityInput.value);
		cityInput.value = "";
	});
}

export function updateTemperatueUnits(unit) {
	console.log(unit);
}
