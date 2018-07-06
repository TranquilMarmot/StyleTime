import { settingsStorage } from 'settings';

import { SETTING_CHANGED } from '../common/commands';
import { sendToPeerSocket } from '../common/util';

// send an event to the device letting it know a setting has changed
const sendSettingChangedEvent = (key, newValue) => {
  sendToPeerSocket({
    command: SETTING_CHANGED,
    key,
    newValue
  });
};

// listen to changes coming from the app
export const initSettings = () => {
  settingsStorage.onchange = (evt) => {
    const { key, newValue } = evt;
    sendSettingChangedEvent(key, newValue);
  };
};

// send any previously saved settings to the device
export const restoreSettings = () => {
  for (let index = 0; index < settingsStorage.length; index += 1) {
    const key = settingsStorage.key(index);
    if (key) {
      sendSettingChangedEvent(key, settingsStorage.getItem(key));
    }
  }
};
