import document from 'document';

import { requestWeatherFromCompanion } from './weather';

let weatherIntervalId = null;

const onWeatherZipCodeSettingChanged = (newValue) => {
  // parse the new value then request another fetch from the API with it
  const weatherZipCode = JSON.parse(newValue).name.replace(/"/g, '');

  // if we already have an interval, clear it
  if (weatherIntervalId) {
    clearInterval(weatherIntervalId);
    weatherIntervalId = null;
  }

  // if we've been given a zip code, request the weather and then set an interval
  if (weatherZipCode && weatherZipCode !== '') {
    requestWeatherFromCompanion(weatherZipCode);

    // fetch weather every hour
    weatherIntervalId = setInterval(
      () => { requestWeatherFromCompanion(weatherZipCode); },
      30 // minutes
      * 60 // seconds
      * 1000 // milliseconds
    );
  }
};

// Called whenever a SETTING_CHANGED event gets sent
// Note that on watchface init, every setting that has a value
// will go through here which will set all the colors etc.
export const onSettingChanged = ({ key, newValue }) => {
  switch (key) {
    case 'backgroundColor':
      document.getElementById('mainBackground').style.fill = newValue.replace(/"/g, '');
      break;
    case 'hoursColor':
      document.getElementById('hoursLabel').style.fill = newValue.replace(/"/g, '');
      break;
    case 'minutesColor':
      document.getElementById('minutesLabel').style.fill = newValue.replace(/"/g, '');
      break;
    case 'sidebarColor':
      document.getElementById('sidebarBackground').style.fill = newValue.replace(/"/g, '');
      break;
    case 'sidebarWidgetColor':
      document.getElementsByClassName('sidebar-widget-element').forEach((element) => { element.style.fill = newValue.replace(/"/g, ''); }); // eslint-disable-line no-param-reassign
      break;
    case 'weatherZipCode':
      onWeatherZipCodeSettingChanged(newValue);
      break;
    default:
      console.warn(`Unknown setting for ${key} with value ${newValue}`);
      break;
  }
};
