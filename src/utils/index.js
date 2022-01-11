export function getDurationString(seconds) {
  if (!seconds) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const second_time = Math.floor(seconds % 60);

  const minutes_str = minutes < 10 ? `0${minutes}` : minutes;
  const second_str = second_time < 10 ? `0${second_time}` : second_time;
  return minutes_str + ":" + second_str;
}
