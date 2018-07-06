// List of commands that get sent/received through the peer socket (device <--> companion)

// Setting has been changed in the app
// Note that on init, every setting that has been set will be sent
export const SETTING_CHANGED = 'SETTING_CHANGED';

// App requesting companion to fetch weather
export const FETCH_WEATHER = 'FETCH_WEATHER';

// Companion has successfully fetched the weather
export const WEATHER_FETCH_SUCCESS = 'WEATHER_FETCH_SUCCESS';
