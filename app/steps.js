import document from 'document';
import { today } from 'user-activity';

const stepsLabel = document.getElementById('stepsLabel');

const stepsToString = (steps) => {
  if (steps < 1000) {
    return `${steps}`;
  }

  // pad with 0s and add a K to signify thousands of steps
  let thousandsOfSteps = `${steps / 1000}`.substring(0, 4);
  while (thousandsOfSteps.length < 4) {
    thousandsOfSteps += '0';
  }

  return `${thousandsOfSteps}K`;
};

export const updateSteps = () => {
  stepsLabel.text = stepsToString(today.local.steps || 0);
};
