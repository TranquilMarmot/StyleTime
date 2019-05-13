import document from 'document';

import { requestWeatherFromCompanion } from './weather';
import * as settings from '../common/settings';

let weatherZipCode = null;
let weatherCountryCode = null;
let weatherUnits = null;
let weatherIntervalId = null;

/**
 * If there is a current weather fetching interval,
 * this will clear it out.
 */
const clearWeatherInterval = () => {
  if (weatherIntervalId) {
    clearInterval(weatherIntervalId);
    weatherIntervalId = null;
  }
};

/**
 * Tell the companion app to fetch the weather using the current settings.
 * Note that defaults are set in the companion app if any of these are null or undefined.
 */
const requestWeatherAndSetInterval = () => {
  requestWeatherFromCompanion(weatherZipCode, weatherCountryCode, weatherUnits);

  weatherIntervalId = setInterval(
    () => {
      requestWeatherFromCompanion(
        weatherZipCode,
        weatherCountryCode,
        weatherUnits
      );
    },
    30 * // minutes
    60 * // seconds
      1000 // milliseconds
  );
};

/**
 * Called when the user changes their zip code
 * @param {string} newValue JSON string with new value
 */
const onWeatherZipCodeSettingChanged = newValue => {
  // parse the new value then request another fetch from the API with it
  weatherZipCode = JSON.parse(newValue).name.replace(/"/g, '');

  // if we already have an interval, clear it
  clearWeatherInterval();

  // if we've been given a zip code, request the weather and then set an interval
  if (weatherZipCode && weatherZipCode !== '') {
    requestWeatherAndSetInterval();
  }
};

/**
 * Called when the user changes their country code
 * @param {string} newValue JSON string with new value
 */
const onWeatherCountryCodeSettingChanged = newValue => {
  // parse the new value then request another fetch from the API with it
  weatherCountryCode = JSON.parse(newValue).name.replace(/"/g, '');

  // if we already have an interval, clear it
  clearWeatherInterval();

  // if we've been given a country code, request the weather and then set an interval
  if (weatherCountryCode && weatherCountryCode !== '') {
    requestWeatherAndSetInterval();
  }
};

/**
 * Called when the user changes their weather units.
 * @param {string} newValue JSON string with new value
 */
const onWeatherUnitsSettingChanged = newValue => {
  // parse the new value then request another fetch from the API with it
  weatherUnits = JSON.parse(newValue).values[0].value.replace(/"/g, '');

  // if we already have an interval, clear it
  clearWeatherInterval();

  // if we've been given a zip code, request the weather and then set an interval
  if (weatherUnits && weatherUnits !== '') {
    requestWeatherAndSetInterval();
  }
};

/**
 * Set the fill color for a given element
 * @param {string} elementId Element ID to set fill for
 * @param {string} fill Fill color to set
 */
const setElementIdStyleFill = (elementId, fill) => {
  document.getElementById(elementId).style.fill = fill.replace(/"/g, '');
};

/**
 * Set the fill color for every element with the given class.
 * @param {string} className Class to set fill for
 * @param {string} fill Fill color to set
 */
const setElementClassNameStyleFill = (className, fill) => {
  document.getElementsByClassName(className).forEach(element => {
    element.style.fill = fill.replace(/"/g, ''); // eslint-disable-line no-param-reassign
  });
};

// Called whenever a SETTING_CHANGED event gets sent
// Note that on watchface init, every setting that has a value
// will go through here which will set all the colors etc.
export const onSettingChanged = ({ key, newValue }) => {
  switch (key) {
    case settings.BACKGROUND_COLOR:
      setElementIdStyleFill('mainBackground', newValue);
      break;
    case settings.HOURS_COLOR:
      setElementIdStyleFill('hoursLabel', newValue);
      break;
    case settings.MINUTES_COLOR:
      setElementIdStyleFill('minutesLabel', newValue);
      break;
    case settings.SIDEBAR_COLOR:
      setElementIdStyleFill('sidebarBackground', newValue);
      break;
    case settings.SIDEBAR_WIDGET_COLOR:
      setElementClassNameStyleFill('sidebar-widget-element', newValue);
      break;
    case settings.WEATHER_ZIP_CODE:
      onWeatherZipCodeSettingChanged(newValue);
      break;
    case settings.WEATHER_COUNTRY_CODE:
      onWeatherCountryCodeSettingChanged(newValue);
      break;
    case settings.WEATHER_UNITS:
      onWeatherUnitsSettingChanged(newValue);
      break;
    default:
      console.warn(`Unknown setting for ${key} with value ${newValue}`);
      break;
  }
};
