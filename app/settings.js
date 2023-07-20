import document from 'document';
import { readFileSync, writeFileSync } from 'fs';

import { requestWeatherFromCompanion } from './weather';
import * as settingsNames from '../common/settingsNames';

/**
 * Name of file to write settings to.
 * This is used so that the watch can have its settings available before the peer socket
 * connection to the companion app is ready to be used, and/or if the bluetooth connection is lost
 * and the peer socket is never started.
 *
 * Note that once the peer socket does start, all of the settings from the phone will be fetched
 * and will overwrite everything in this file.
 */
const SETTINGS_FILE_NAME = 'settings.json';

/**
 * The settings object that gets written out to/read from disk.
 *
 * It's worth noting that the values in here are "dirty" (they contain quotation marks and other JSON objects)
 * When being read back from disk they are fed into "onSettingChanged" which mangles them into usable values.
 */
let settings = {};

// current weather settings; a combo of these can be used to fetch the weather
let weatherZipCode = null;
let weatherUnits = null;

/**
 * The current weather interval id that continuously fetches weather from the companion app
 * whenever a weather setting is changed, this interval is cleared and set up again
 */
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
  requestWeatherFromCompanion(weatherZipCode, weatherUnits);

  weatherIntervalId = setInterval(
    () => {
      requestWeatherFromCompanion(weatherZipCode, weatherUnits);
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
const onWeatherZipCodeSettingChanged = (newValue) => {
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
 * Called when the user changes their weather units.
 * @param {string} newValue JSON string with new value
 */
const onWeatherUnitsSettingChanged = (newValue) => {
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
  document.getElementsByClassName(className).forEach((element) => {
    element.style.fill = fill.replace(/"/g, ''); // eslint-disable-line no-param-reassign
  });
};

/**
 * Writes out the current settings object to disk.
 * This is so that, when the watchface starts up, it doens't have to wait to connect
 * to the phone to get the settings.
 *
 * Note that
 */
export const writeSettingsToFile = () => {};

/**
 * Called whenever a SETTING_CHANGED event gets sent
 * Note that on watchface init, every setting that has a value
 * will go through here which will set all the colors etc.
 * @param {object} keyAndValue Object with { key, newValue } setting to set
 * @param {boolean} persistToFile Whether or not to persist settings to disk after changing it
 */
export const onSettingChanged = ({ key, newValue }, persistToFile) => {
  switch (key) {
    case settingsNames.BACKGROUND_COLOR:
      setElementIdStyleFill('mainBackground', newValue);
      break;
    case settingsNames.HOURS_COLOR:
      setElementIdStyleFill('hoursLabel', newValue);
      break;
    case settingsNames.MINUTES_COLOR:
      setElementIdStyleFill('minutesLabel', newValue);
      break;
    case settingsNames.SIDEBAR_COLOR:
      setElementIdStyleFill('sidebarBackground', newValue);
      break;
    case settingsNames.SIDEBAR_WIDGET_COLOR:
      setElementClassNameStyleFill('sidebar-widget-element', newValue);
      break;
    case settingsNames.WEATHER_ZIP_CODE:
      onWeatherZipCodeSettingChanged(newValue);
      break;
    case settingsNames.WEATHER_UNITS:
      onWeatherUnitsSettingChanged(newValue);
      break;
    default:
      console.warn(`Unknown setting for ${key} with value ${newValue}`);
      return;
  }

  // if we're told to persist to file, do so (but only if the settings are actually different)
  if (persistToFile === true && settings[key] !== newValue) {
    console.log('Writing settings file', JSON.stringify(settings));
    settings[key] = newValue;
    writeFileSync(SETTINGS_FILE_NAME, settings, 'json');
  }
};

export const readSettingsFromFile = () => {
  try {
    settings = readFileSync(SETTINGS_FILE_NAME, 'json');

    Object.keys(settings).forEach((key) => {
      // we skip the weather-related settings since this is happening before the
      // peer socket is even set up; setting them will auto-fetch the weather.
      //
      // note that once the peer socket is setup, the app will request all settings from the companion app
      // which will then set the weather anyway
      if (
        key !== settingsNames.WEATHER_ZIP_CODE &&
        key !== settingsNames.WEATHER_UNITS
      ) {
        // false here skips persisting the files to disk where we just read them from
        onSettingChanged({ key, newValue: settings[key] }, false);
      }
    });
  } catch (e) {
    console.warn('Error reading settings', e);
  }
};
