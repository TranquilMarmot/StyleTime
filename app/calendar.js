import document from 'document';

const calendarDayOfWeekLabel = document.getElementById('calendarDayOfWeekLabel');
const calendarMonthLabel = document.getElementById('calendarMonthLabel');
const calendarDayOfMonthLabel = document.getElementById('calendarDayOfMonthLabel');

const getDayOfWeekString = (date) => {
  switch (date.getDay()) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return '???';
  }
}

const getMonthString = (date) => {
  switch(date.getMonth()) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    case 12:
      return 'Jan';
    default:
      return '???';
  }
}

export const updateCalendar = (currentDate) => {
  calendarDayOfWeekLabel.text = getDayOfWeekString(currentDate);
  calendarMonthLabel.text = getMonthString(currentDate);
  calendarDayOfMonthLabel.text = currentDate.getDate();
}