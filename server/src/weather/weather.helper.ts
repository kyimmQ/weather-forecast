import { WeatherType } from 'src/types/weather.type';

export const createWeatherObject = (data): WeatherType => {
  const newWeather = {
    location: '',
    date: '',
    temp: 0,
    condition: {
      text: '',
      icon: '',
    },
    wspeed: 0,
    humidity: 0,
    uv: '',
    vision: 0,
  };
  const {
    location,
    date,
    temp,
    humidity,
    vision,
    wspeed,
    uv,
    condition_text,
    condition_icon,
  } = data;
  newWeather.location = location;
  newWeather.temp = temp;
  newWeather.humidity = humidity;
  newWeather.vision = vision;
  newWeather.wspeed = wspeed;
  newWeather.date = date;
  newWeather.uv = uv;
  newWeather.condition.text = condition_text;
  newWeather.condition.icon = condition_icon;
  return newWeather;
};
