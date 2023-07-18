import document from 'document';

import { FETCH_WEATHER } from '../common/commands';
import { sendToPeerSocket } from '../common/util';

const weatherLabel = document.getElementById('weatherLabel');

// weatherIcon_800 is our default icon that starts as shown and not hidden
let currentWeatherIconId = 'weatherIcon_800';

// see https://www.weatherapi.com/docs/weather_conditions.json for a list of weather codes
const codeToIcon = {
  1000: "clear",
  1003: "cloudy",
  1006: "cloudy",
  1009: "cloudy",
  1030: "mist",
  1063: "rain",
  1066: "snow",
  1069: "snow",
  1072: "drizzle",
  1087: "thunderstorm",
  1114: "snow",
  1117: "snow",
  1135: "atmosphere",
  1147: "atmosphere",
  1150: "drizzle",
  1153: "drizzle",
  1168: "drizzle",
  1171: "drizzle",
  1180: "rain",
  1183: "rain",
  1186: "rain",
  1189: "rain",
  1192: "rain",
  1195: "rain",
  1198: "rain",
  1201: "rain",
  1204: "storm",
  1207: "storm",
  1210: "snow",
  1213: "snow",
  1216: "snow",
  1219: "snow",
  1222: "snow",
  1225: "snow",
  1237: "snow",
  1240: "rain",
  1243: "rain",
  1246: "rain",
  1249: "storm",
  1252: "storm",
  1255: "snow",
  1258: "snow",
  1261: "snow",
  1264: "snow",
  1273: "thunderstorm",
  1276: "thunderstorm",
  1279: "thunderstorm",
  1282: "thunderstorm"
};


// Request weather data from the companion
// This is set in a timeout in settings.js when the zip code setting is read
export const requestWeatherFromCompanion = (zipCode, countryCode, units) => {
  weatherLabel.text = '--°';

  sendToPeerSocket({
    command: FETCH_WEATHER,
    zipCode,
    countryCode,
    units
  });
};

const getIconIdFromWeatherId = weatherId => {
  const iconName = codeToIcon[weatherId] || "clear";
  return `weatherIcon_${iconName}`;
};

export const onWeatherFetchSuccess = data => {
  // round temperature up to a whole number
  const roundedTemperature = Math.floor(Math.round(data.temperature, 1));
  weatherLabel.text = `${roundedTemperature}°`;

  // hide the current icon
  document.getElementById(currentWeatherIconId).style.display = 'none';

  currentWeatherIconId = getIconIdFromWeatherId(data.weather);

  // show the new icon
  document.getElementById(currentWeatherIconId).style.display = 'inline';
};
