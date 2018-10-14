function formatTime(timeRequest, timeStart) {
  let seconds = Math.floor((timeRequest - timeStart)/ 1000);
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  if (hours   < 10) {
    hours   = '0'+hours;
  }
  if (minutes < 10) {
    minutes = '0'+minutes;
  }
  if (seconds < 10) {
    seconds = '0'+seconds;
  }

  return (hours + ':' + minutes + ':' + seconds);
}

module.exports = formatTime;