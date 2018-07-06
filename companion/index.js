import { initMessaging } from './messaging';
import { initSettings } from './settings';

// initialize messaging to receive messages from the app
initMessaging();

// initialize the settings to listen for changes coming from the app
initSettings();
