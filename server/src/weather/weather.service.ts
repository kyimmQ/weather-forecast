import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WeatherType } from 'src/types/weather.type';
import { createWeatherObject } from './weather.helper';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
    this.apiUrl = 'https://api.weatherapi.com/v1';
  }

  // async getCurrent(city: string): Promise<WeatherType> {
  //   const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`;
  //   const result = (await firstValueFrom(this.httpService.get(url))).data;
  //   let currentWeather: WeatherType = createWeatherObject(result);
  //   return currentWeather;
  // }

  async getForecast(city: string): Promise<WeatherType[]> {
    let weathers: WeatherType[] = [];
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${7}&hour=0&alerts=no&aqi=no`;

    const result = (await firstValueFrom(this.httpService.get(url))).data;
    const { location, forecast } = result;
    const forecasts: [] = forecast.forecastday;
    const cityLocation = `${location.name}, ${location.country}`;
    weathers = forecasts.map((day: any) =>
      createWeatherObject({
        location: cityLocation,
        date: day.date,
        temp: day.day.avgtemp_c,
        humidity: day.day.avghumidity,
        vision: day.day.avgvis_km,
        wspeed: day.day.maxwind_kph,
        uv: day.day.uv,
        condition_text: day.day.condition.text,
        condition_icon: day.day.condition.icon,
      }),
    );

    return weathers;
  }
}
