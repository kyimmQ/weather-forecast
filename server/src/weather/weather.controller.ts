import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherType } from 'src/types/weather.type';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get()
  async getWeather(
    @Query('city') city: string,
  ): Promise<{ status: string; data: any; msg: string | null }> {
    try {
      const result = await this.weatherService.getForecast(city);
      return {
        status: 'SUCCESS',
        data: result,
        msg: null,
      };
    } catch (error) {
      const message = error.response
        ? error.response.data.error.message
        : 'Internal Server Error';
      return {
        status: 'FAILED',
        data: null,
        msg: message,
      };
    }
  }
}
