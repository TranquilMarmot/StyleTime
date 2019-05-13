import document from 'document';

import { requestWeatherFromCompanion } from './weather';

let weatherZipCode = null;
let weatherCountryCode = null;
let weatherUnits = null;
let weatherIntervalId = null;

const clearWeatherInterval = () => {
  if (weatherIntervalId) {
    clearInterval(weatherIntervalId);
    weatherIntervalId = null;
  }
};

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

const onWeatherCountryCodeSettingChanged = newValue => {
  // parse the new value then request another fetch from the API with it
  weatherCountryCode = JSON.parse(newValue).name.replace(/"/g, '');

  // if we already have an interval, clear it
  clearWeatherInterval();

  // if we've been given a zip code, request the weather and then set an interval
  if (weatherCountryCode && weatherCountryCode !== '') {
    requestWeatherAndSetInterval();
  }
};

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

const setElementIdStyleFill = (elementId, fill) => {
  document.getElementById(elementId).style.fill = fill.replace(/"/g, '');
};

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
    case 'backgroundColor':
      setElementIdStyleFill('mainBackground', newValue);
      break;
    case 'hoursColor':
      setElementIdStyleFill('hoursLabel', newValue);
      break;
    case 'minutesColor':
      setElementIdStyleFill('minutesLabel', newValue);
      break;
    case 'sidebarColor':
      setElementIdStyleFill('sidebarBackground', newValue);
      break;
    case 'sidebarWidgetColor':
      setElementClassNameStyleFill('sidebar-widget-element', newValue);
      break;
    case 'weatherZipCode':
      onWeatherZipCodeSettingChanged(newValue);
      break;
    case 'weatherCountryCode':
      onWeatherCountryCodeSettingChanged(newValue);
      break;
    case 'weatherUnits':
      onWeatherUnitsSettingChanged(newValue);
      break;
    default:
      console.warn(`Unknown setting for ${key} with value ${newValue}`);
      break;
  }
};
