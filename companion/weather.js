import { WEATHER_FETCH_SUCCESS } from '../common/commands';
import { getOpenWeatherMapApiKey } from '../common/secrets';

const getOpenWeatherMapUrl = zipCode => `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${getOpenWeatherMapApiKey()}`;

export const queryOpenWeatherMap = async (callback, zipCode) => {
  try {
    const result = await fetch(getOpenWeatherMapUrl(zipCode));

    if (!result.ok) {
      throw new Error(`Non-OK response from openweathermap of ${result.status}`);
    }

    const data = await result.json();
    callback({
      command: WEATHER_FETCH_SUCCESS,
      temperature: data.main.temp,
      weather: data.weather[0].id
    });
  } catch (err) {
    console.log(`Error fetching weather; ${err}`);
  }
};
