import document from 'document';
import { HeartRateSensor } from 'heart-rate';

const heartRateLabel = document.getElementById('heartRateLabel');

const heartRateSensor = new HeartRateSensor();

heartRateSensor.onreading = () => {
  heartRateLabel.text = heartRateSensor.heartRate;
  
  // stop the sensor until the next reading
  heartRateSensor.stop();
}

export const readHeartRate = () => {
  heartRateSensor.start();
}