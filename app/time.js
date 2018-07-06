import document from 'document';
import { preferences } from 'user-settings';

const hoursLabel = document.getElementById('hoursLabel');
const minutesLabel = document.getElementById('minutesLabel');

// Add a zero in front of a number if it's less than 10
const zeroPad = (number) => {
  let padded = number;

  if (padded < 10) {
    padded = `0${padded}`;
  }

  return padded;
};

export const updateTime = (currentDate) => {
  const hours = currentDate.getHours();
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hoursLabel.text = zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hoursLabel.text = zeroPad(hours);
  }

  minutesLabel.text = zeroPad(currentDate.getMinutes());
};
