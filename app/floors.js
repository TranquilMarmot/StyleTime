import document from 'document';
import { today } from 'user-activity';

const floorsLabel = document.getElementById('floorsLabel');

export const updateFloors = () => {
  floorsLabel.text = today.local.elevationGain || 0;
};
