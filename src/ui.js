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
          <p id="temper-para">${data.temperature}°${data.unit}</p>
          <p id="condition-para">${data.conditions}</p>
        </div>
        <div class="today-side-container">
          <div class="today-extra-data-div">
            <p>Wind</p>
            <p class="today-data-para">${data.windSpeed} km/h</p>
          </div>
          <div class="today-extra-data-div">
            <p>Feels like</p>
            <p class="today-data-para feelslike-para">${data.feelsLike}°C</p>
          </div>
          <div class="today-extra-data-div">
            <p>Precipitation</p>
            <p class="today-data-para">${data.precip} mm</p>
          </div>
        </div>
      </div>
    `;
}

function toggleUnitBtnBackground(clickedBtn) {
	for (const btn of headerBtnDiv.children) {
		btn.classList.remove("clicked-header-button");
	}
	clickedBtn.classList.add("clicked-header-button");
}

export function bindUnitbuttons(callback) {
	headerBtnDiv.addEventListener("click", (e) => {
		const unit = e.target.getAttribute("data-unit");
		if (unit) {
			callback(unit);
			toggleUnitBtnBackground(e.target);
		}
	});
}

export function bindCityInput(callback) {
	searchForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if (cityInput.value.trim() === "") {
			alert("Error. Empty input not allowed");
			return;
		}
		callback(cityInput.value);
		cityInput.value = "";
	});
}

export function updateTemperatureUnits(unit, temper, feelsLike) {
	const feelsLikePara = document.querySelector(".feelslike-para");
	const mainTemperPara = document.querySelector("#temper-para");
	feelsLikePara.textContent = `${feelsLike}°${unit}`;
	mainTemperPara.textContent = `${temper}°${unit}`;
}

export function renderCityError(cityName) {
	todayDiv.innerHTML = `
        <p class="error-para">Couldn't get data for ${cityName}</p>
    `;
}
