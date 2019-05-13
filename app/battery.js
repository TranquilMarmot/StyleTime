import document from 'document';
import { battery } from 'power';

const batteryLabel = document.getElementById('batteryLabel');
const batteryFill = document.getElementById('batteryFill');

// how wide the inside of the battery is
const maxBatteryFillWidth = 40;

// Thanks Michael Jackson! https://gist.github.com/mjackson/5311256
function hsvToRgb(h, s, v) {
  let r;
  let g;
  let b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

// fuckin' magic https://stackoverflow.com/a/19765382
function rgbToHex(color) {
  const rgb = color.b | (color.g << 8) | (color.r << 16); // eslint-disable-line no-bitwise
  return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
}

const getHexFillColor = percent => {
  // in hsv, hue of 0 is red and 120 is green
  // hue is out of 360, though, so we need to multiply by 360
  // percent / 100 because it needs to be between 0 and 1
  const hue = (percent / 100) * (120 / 360);
  return rgbToHex(hsvToRgb(hue, 1, 1));
};

export const updateBattery = () => {
  const { chargeLevel } = battery;
  batteryLabel.text = `${chargeLevel}%`;

  const fixedPercent = chargeLevel / (100 / maxBatteryFillWidth);

  batteryFill.width = fixedPercent;
  batteryFill.style.fill = getHexFillColor(chargeLevel);
};
