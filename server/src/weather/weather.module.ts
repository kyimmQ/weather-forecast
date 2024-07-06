import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
