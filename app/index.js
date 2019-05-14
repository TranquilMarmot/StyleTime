import document from 'document';
import clock from 'clock';
import { vibration } from 'haptics';

import { updateTime } from './time';
import { updateSteps } from './steps';
import { updateCalendar } from './calendar';
import { updateFloors } from './floors';
import { updateBattery } from './battery';
import { readHeartRate } from './heartRate';

import { initMessaging } from './messaging';
import { readSettingsFromFile } from './settings';

const main = document.getElementById('main');
const sidebar1 = document.getElementById('sidebar-1');
const sidebar2 = document.getElementById('sidebar-2');
let currentSidebar = sidebar1;

/*
TODO
- Double tap to change between sidebar modes (with setting)
- Animate sidebar transition
- Make this work better with the Ionic
- Allow users to set their own intervals for updates
*/

// update everything every minute
clock.granularity = 'minutes';
clock.ontick = evt => {
  const currentDate = evt.date;
  updateTime(currentDate);
  updateCalendar(currentDate);
  updateSteps();
  updateFloors();
  updateBattery();
  readHeartRate();
};

main.onclick = () => {
  // on "click" swap the sidebar display
  vibration.start('bump');
  currentSidebar.style.display = 'none';
  currentSidebar = currentSidebar === sidebar1 ? sidebar2 : sidebar1;
  currentSidebar.style.display = 'inline';
};

// first we try to read settings from a file on disk
// this is faster than fetching the settings from the companion app
// and still works if bluetooth is off
readSettingsFromFile();

// initialize the companion app messaging peer socket
// this will also request all of the settings from the companion app
initMessaging();
