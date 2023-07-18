import { WEATHER_FETCH_SUCCESS } from '../common/commands';
import { getWeatherApiKey } from '../common/secrets';

const getWeatherApiUrl = (zipCode) =>
  `http://api.weatherapi.com/v1/current.json?q=${zipCode ||
    98102}&key=${getWeatherApiKey()}`;

export const queryOpenWeatherMap = async (
  callback,
  { zipCode, countryCode, units }
) => {
  try {
    const result = await fetch(
      getWeatherApiUrl(zipCode, countryCode, units)
    );

    if (!result.ok) {
      throw new Error(
        `Non-OK response from weatherapi of ${result.status}`
      );
    }

    const data = await result.json();
    callback({
      command: WEATHER_FETCH_SUCCESS,
      temperature: units === "imperial" ? data.current.temp_f : data.current.temp_c,
      weather: data.weather[0].id
    });
  } catch (err) {
    console.log(`Error fetching weather; ${err}`);
  }
};
