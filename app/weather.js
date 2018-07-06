import document from 'document';

import { FETCH_WEATHER } from '../common/commands';
import { sendToPeerSocket } from '../common/util';

const weatherLabel = document.getElementById('weatherLabel');

// weatherIcon_800 is our default icon that starts as shown and not hidden
let currentWeatherIconId = 'weatherIcon_800';

// Request weather data from the companion
// This is set in a timeout in settings.js when the zip code setting is read
export const requestWeatherFromCompanion = (zipCode) => {
  weatherLabel.text = '--°';

  sendToPeerSocket({
    command: FETCH_WEATHER,
    zipCode
  });
};

const getIconIdFromWeatherId = (weatherId) => {
  // see https://openweathermap.org/weather-conditions for a list of weather codes
  if (weatherId === 800) {
    // 800 is a special code for "clear"; everything else is just in a group
    return 'weatherIcon_800';
  }

  const weatherIdGroup = `${weatherId}`.substring(0, 1);
  return `weatherIcon_${weatherIdGroup}xx`;
};

export const onWeatherFetchSuccess = (data) => {
  // round temperature up to a whole number
  const roundedTemperature = Math.floor(Math.round(data.temperature, 1));
  weatherLabel.text = `${roundedTemperature}°`;

  // hide the current icon
  document.getElementById(currentWeatherIconId).style.display = 'none';

  currentWeatherIconId = getIconIdFromWeatherId(data.weather);

  // show the new icon
  document.getElementById(currentWeatherIconId).style.display = 'inline';
};
