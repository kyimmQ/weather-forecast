import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { EmailService } from '../email/email.service';
import { WeatherService } from '../weather/weather.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private emailService: EmailService,
    private weatherService: WeatherService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async subscribe(email: string, city: string): Promise<void> {
    const token = this.jwtService.sign({ email, city });
    // console.log(email, city);
    const subscription = await this.subscriptionRepository.findOneBy({
      email,
      city,
    });
    if (!subscription) {
      const newSubscription = new Subscription();
      newSubscription.email = email;
      newSubscription.city = city;
      newSubscription.confirmationToken = token;

      await this.subscriptionRepository.save(newSubscription);
    } else {
      if (!subscription.confirmed) subscription.confirmationToken = token;
      else return;
    }

    const confirmationUrl = `${this.configService.get<string>('BASE_URL')}/subscription?token=${token}`;

    await this.emailService.sendEmail(
      email,
      'Subscription Confirmation',
      `Please confirm your subscription to ${city} by clicking on the following link: ${confirmationUrl}`,
    );
  }
  async confirmSubscription(token: string): Promise<void> {
    const payload = this.jwtService.verify(token);
    const { email, city } = payload;
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        email: email,
        city: city,
      },
    });
    if (subscription && !subscription.confirmed) {
      subscription.confirmed = true;
      subscription.confirmationToken = null;
      await this.subscriptionRepository.save(subscription);
    }
  }
  async unsubscribe(email: string, city: string): Promise<void> {
    await this.subscriptionRepository.delete({
      email: email,
      city: city,
    });
  }
  async sendDailyForecasts(): Promise<void> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { confirmed: true },
    });
    for (const subscription of subscriptions) {
      const forecast = await this.weatherService.getForecast(subscription.city);
      let msg = '';
      forecast.forEach((day) => {
        msg += `The weather for ${day.date} will be ${day.condition.text} and the temperature will be ${day.temp}.\n`;
      });
      await this.emailService.sendEmail(
        subscription.email,
        `Daily Weather Forecast for ${subscription.city}`,
        msg,
      );
    }
  }
}
